import { useState, useEffect, useCallback } from 'react'
import { fetchProjects, fetchProject, createProject } from '../services/projects'

export const useProjects = (initialCategory = '') => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastDoc, setLastDoc] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const loadProjects = useCallback(async (category = initialCategory, loadMore = false) => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchProjects({
        pageSize: 12,
        lastDoc: loadMore ? lastDoc : null,
        category: category || null
      })

      if (loadMore) {
        setProjects(prev => [...prev, ...result.projects])
      } else {
        setProjects(result.projects)
      }
      setLastDoc(result.lastDoc)
      setHasMore(result.hasMore)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [initialCategory, lastDoc])

  useEffect(() => {
    loadProjects()
  }, [])

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      return loadProjects(null, true)
    }
  }, [hasMore, loading, loadProjects])

  return {
    projects,
    loading,
    error,
    hasMore,
    loadMore,
    refresh: () => {
      setLastDoc(null)
      return loadProjects()
    }
  }
}

export const useProject = (projectId) => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!projectId) return

    setLoading(true)
    setError(null)

    fetchProject(projectId)
      .then(data => setProject(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [projectId])

  return { project, loading, error }
}

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = useCallback(async (data) => {
    setLoading(true)
    setError(null)

    try {
      const id = await createProject(data)
      return { success: true, id }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  return { submit, loading, error }
}
