import { useState, useEffect, useCallback } from 'react'
import { fetchIssues, fetchIssue, createIssue, parseIssueBody } from '../utils/github'

export const useIssues = (initialPage = 1, perPage = 10, labels = '') => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  const loadIssues = useCallback(async (page = currentPage, filterLabels = labels) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetchIssues(page, perPage, filterLabels)
      
      const parsedIssues = result.issues.map(issue => ({
        id: issue.number,
        title: issue.title,
        author: issue.user.login,
        authorAvatar: issue.user.avatar_url,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        labels: issue.labels.map(l => l.name),
        comments: issue.comments,
        ...parseIssueBody(issue.body || '')
      }))
      
      setIssues(parsedIssues)
      setTotalPages(result.totalPages)
      setCurrentPage(page)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [currentPage, perPage, labels])

  useEffect(() => {
    loadIssues()
  }, [])

  const refreshIssues = useCallback(() => {
    return loadIssues(currentPage, labels)
  }, [loadIssues, currentPage, labels])

  const goToPage = useCallback((page) => {
    return loadIssues(page, labels)
  }, [loadIssues, labels])

  return {
    issues,
    loading,
    error,
    currentPage,
    totalPages,
    refreshIssues,
    goToPage
  }
}

export const useIssue = (issueNumber) => {
  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadIssue = useCallback(async () => {
    if (!issueNumber) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchIssue(issueNumber)
      const parsed = {
        id: data.number,
        title: data.title,
        author: data.user.login,
        authorAvatar: data.user.avatar_url,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        labels: data.labels.map(l => l.name),
        comments: data.comments,
        body: data.body,
        ...parseIssueBody(data.body || '')
      }
      
      setIssue(parsed)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [issueNumber])

  useEffect(() => {
    loadIssue()
  }, [loadIssue])

  const refreshIssue = useCallback(() => {
    return loadIssue()
  }, [loadIssue])

  return {
    issue,
    loading,
    error,
    refreshIssue
  }
}

export const useCreateIssue = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitIssue = useCallback(async (title, metadata, content, token = null) => {
    setLoading(true)
    setError(null)
    
    try {
      const labels = ['submission']
      if (metadata.category) {
        labels.push(metadata.category)
      }
      
      let body = '---\n'
      Object.entries(metadata).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          body += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`
        } else {
          body += `${key}: "${value}"\n`
        }
      })
      body += '---\n\n'
      body += content
      
      const result = await createIssue(title, body, labels, token)
      return { success: true, issue: result }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    submitIssue,
    loading,
    error
  }
}
