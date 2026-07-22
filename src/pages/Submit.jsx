import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const GITHUB_OWNER = 'nafisahammad'
const GITHUB_REPO = 'NiryoServer'

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'project',
    repoUrl: '',
    images: '',
    tags: '',
    guestName: ''
  })

  const categories = [
    { value: 'project', label: 'Project', description: 'Share your project, experiment, or implementation' },
    { value: 'guide', label: 'Guide', description: 'Write a tutorial or how-to guide' },
    { value: 'question', label: 'Question', description: 'Ask the community for help' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const buildIssueBody = () => {
    let yaml = '---\n'
    yaml += `category: "${formData.category}"\n`
    if (formData.guestName) yaml += `author: "${formData.guestName}"\n`
    if (formData.repoUrl) yaml += `repo_url: "${formData.repoUrl}"\n`
    if (formData.images) {
      const images = formData.images.split('\n').filter(url => url.trim())
      yaml += `images: [${images.map(i => `"${i.trim()}"`).join(', ')}]\n`
    }
    if (formData.tags) {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      yaml += `tags: [${tags.map(t => `"${t}"`).join(', ')}]\n`
    }
    yaml += '---\n\n'
    yaml += formData.description
    return yaml
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const body = buildIssueBody()
    const labels = ['submission', formData.category].join(',')
    const params = new URLSearchParams({
      title: formData.title,
      labels,
      body
    })

    window.location.href = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?${params.toString()}`
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

          <div className="bg-niryo-blue/10 border border-niryo-blue/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-niryo-blue/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-niryo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">How it works</h3>
                <p className="text-gray-400">
                  Fill in the form below and click Submit. You'll be taken to GitHub to create the issue — 
                  just log in (or create a free account) and click "Submit new issue".
                </p>
              </div>
            </div>
          </div>

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

            <div className="pt-4">
              <button
                type="submit"
                disabled={!formData.title || !formData.description || !formData.guestName}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit on GitHub
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                You'll be redirected to GitHub to complete your submission
              </p>
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
