import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useGitHubAuth } from '../hooks/useGitHubAuth'
import { useCreateIssue } from '../hooks/useIssues'

const Submit = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, token, isConfigured, startDeviceFlow } = useGitHubAuth()
  const { submitIssue, loading, error } = useCreateIssue()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'project',
    repoUrl: '',
    images: '',
    tags: '',
    guestName: ''
  })

  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [authError, setAuthError] = useState(null)

  const categories = [
    { value: 'project', label: 'Project', description: 'Share your project, experiment, or implementation' },
    { value: 'guide', label: 'Guide', description: 'Write a tutorial or how-to guide' },
    { value: 'question', label: 'Question', description: 'Ask the community for help' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const metadata = {
      category: formData.category,
      repo_url: formData.repoUrl || undefined,
      images: formData.images ? formData.images.split('\n').filter(url => url.trim()) : [],
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
    }

    if (isAuthenticated) {
      metadata.github_username = user.login
    } else {
      metadata.author = formData.guestName || 'Anonymous'
    }

    const result = await submitIssue(
      formData.title,
      metadata,
      formData.description,
      token
    )

    if (result.success) {
      navigate(`/post/${result.issue.number}`)
    }
  }

  return (
    <>
      <Helmet>
        <title>Submit Your Work | Niryo NED Community</title>
        <meta name="description" content="Share your Niryo NED projects, guides, and experiments with the KUET community" />
      </Helmet>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Submit</span> Your Work
            </h1>
            <p className="text-xl text-gray-400">
              Share your projects, guides, and experiments with the community
            </p>
          </div>

          {!isAuthenticated && (
            <div className="bg-niryo-blue/10 border border-niryo-blue/30 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-niryo-blue/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-niryo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Submitting as Guest</h3>
                  <p className="text-gray-400 mb-4">
                    You can submit without logging in. Just provide your name below. 
                    Login with GitHub to link your submission to your profile.
                  </p>
                  <button
                    onClick={async () => {
                      setAuthError(null)
                      const result = await startDeviceFlow()
                      if (result.notConfigured) {
                        setAuthError('GitHub login is not configured yet. You can still submit as a guest.')
                      }
                    }}
                    className="btn-secondary text-sm"
                  >
                    Login with GitHub
                  </button>
                </div>
              </div>
            </div>
          )}

          {authError && (
            <div className="bg-niryo-blue/10 border border-niryo-blue/30 rounded-xl p-4 mb-8">
              <p className="text-gray-300 text-sm">{authError}</p>
            </div>
          )}

          {isAuthenticated && (
            <div className="bg-niryo-accent/10 border border-niryo-accent/30 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full border-2 border-niryo-accent"
                />
                <div>
                  <div className="text-white font-medium">Submitting as {user.login}</div>
                  <div className="text-sm text-gray-400">Your submission will be linked to your GitHub profile</div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title <span className="text-niryo-blue">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Pick and Place with Computer Vision"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-niryo-blue">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.category === cat.value
                        ? 'border-niryo-blue bg-niryo-blue/10'
                        : 'border-niryo-gray hover:border-niryo-blue/50'
                    }`}
                  >
                    <div className="font-medium text-white">{cat.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {!isAuthenticated && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name <span className="text-niryo-blue">*</span>
                </label>
                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description <span className="text-niryo-blue">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Supports Markdown formatting</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={12}
                placeholder={`## Overview\nDescribe your project...\n\n## Features\n- Feature 1\n- Feature 2\n\n## How to Run\n1. Clone the repo\n2. Install dependencies\n3. Run the code`}
                className="input-field font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub Repository URL
              </label>
              <input
                type="url"
                name="repoUrl"
                value={formData.repoUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URLs
              </label>
              <p className="text-xs text-gray-500 mb-2">One URL per line (use Imgur, Google Drive, etc.)</p>
              <textarea
                name="images"
                value={formData.images}
                onChange={handleChange}
                rows={3}
                placeholder={`https://i.imgur.com/example1.jpg\nhttps://i.imgur.com/example2.jpg`}
                className="input-field text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="pick-and-place, opencv, python (comma separated)"
                className="input-field"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !formData.title || !formData.description}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Your Work'
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 card">
            <h3 className="text-lg font-semibold text-white mb-4">Submission Guidelines</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Provide a clear, descriptive title for your submission</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Include detailed instructions on how to run your code</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Add relevant tags to help others discover your work</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Link to your GitHub repository if available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Submit
