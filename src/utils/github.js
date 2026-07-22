import { Octokit } from 'octokit'

const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'your-username'
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'NiryoServer'

let octokitInstance = null

export const getOctokit = (token = null) => {
  if (token) {
    return new Octokit({ auth: token })
  }
  
  if (!octokitInstance) {
    octokitInstance = new Octokit()
  }
  
  return octokitInstance
}

export const getOwner = () => GITHUB_OWNER
export const getRepo = () => GITHUB_REPO

export const fetchIssues = async (page = 1, perPage = 10, labels = '') => {
  const octokit = getOctokit()
  const params = {
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    page,
    per_page: perPage,
    state: 'open'
  }
  
  if (labels) {
    params.labels = labels
  }
  
  const { data, headers } = await octokit.rest.issues.listForRepo(params)
  
  const totalPages = parseInt(headers['x-total-count'] || '1')
  
  return {
    issues: data.filter(issue => !issue.pull_request),
    totalPages,
    currentPage: page
  }
}

export const fetchIssue = async (issueNumber) => {
  const octokit = getOctokit()
  const { data } = await octokit.rest.issues.get({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    issue_number: issueNumber
  })
  
  return data
}

export const createIssue = async (title, body, labels = [], token = null) => {
  const octokit = getOctokit(token)
  const { data } = await octokit.rest.issues.create({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    title,
    body,
    labels
  })
  
  return data
}

export const parseIssueBody = (body) => {
  const metadata = {}
  const yamlRegex = /---\n([\s\S]*?)\n---/
  const match = body.match(yamlRegex)
  
  if (match) {
    const yamlContent = match[1]
    yamlContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim()
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''))
        } else {
          value = value.replace(/"/g, '')
        }
        metadata[key.trim()] = value
      }
    })
  }
  
  const content = body.replace(/---\n[\s\S]*?\n---\n?/, '').trim()
  
  return { metadata, content }
}

export const formatIssueBody = (metadata, content) => {
  let yaml = '---\n'
  Object.entries(metadata).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      yaml += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`
    } else {
      yaml += `${key}: "${value}"\n`
    }
  })
  yaml += '---\n\n'
  
  return yaml + content
}
