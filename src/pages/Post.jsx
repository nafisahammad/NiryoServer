import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import { useIssue } from '../hooks/useIssues'

const Post = () => {
  const { id } = useParams()
  const { issue, loading, error } = useIssue(parseInt(id))

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const categoryColors = {
    project: 'bg-niryo-accent/20 text-niryo-accent',
    guide: 'bg-niryo-blue/20 text-niryo-blue',
    question: 'bg-niryo-orange/20 text-niryo-orange',
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-niryo-gray rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-niryo-gray rounded w-3/4 mb-8"></div>
            <div className="h-64 bg-niryo-gray rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-niryo-gray rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Post</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link to="/explore" className="btn-primary">
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  if (!issue) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-400 mb-8">The post you're looking for doesn't exist.</p>
          <Link to="/explore" className="btn-primary">
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  const category = issue.metadata?.category || issue.labels.find(l => 
    ['project', 'guide', 'question'].includes(l)
  ) || 'project'

  return (
    <>
      <Helmet>
        <title>{issue.title} | Niryo NED Community</title>
        <meta name="description" content={issue.content?.substring(0, 160)} />
      </Helmet>

      <article className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/explore"
            className="inline-flex items-center text-niryo-blue hover:text-niryo-accent mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category] || 'bg-niryo-gray text-gray-400'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            {issue.metadata?.repo_url && (
              <a
                href={issue.metadata.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 bg-niryo-gray rounded-full text-sm text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View Repository
              </a>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {issue.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-niryo-gray">
            <img
              src={issue.authorAvatar}
              alt={issue.author}
              className="w-12 h-12 rounded-full border-2 border-niryo-blue"
            />
            <div>
              <div className="text-white font-medium">
                {issue.metadata?.github_username || issue.metadata?.author || issue.author}
              </div>
              <div className="text-sm text-gray-400">
                Posted on {formatDate(issue.createdAt)}
                {issue.updatedAt !== issue.createdAt && (
                  <span> · Updated {formatDate(issue.updatedAt)}</span>
                )}
              </div>
            </div>
          </div>

          {issue.metadata?.images && issue.metadata.images.length > 0 && (
            <div className="mb-8">
              <div className="grid gap-4">
                {issue.metadata.images.map((imageUrl, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-niryo-blue/20">
                    <img
                      src={imageUrl}
                      alt={`${issue.title} - Image ${index + 1}`}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.parentElement.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold text-white mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-300">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-niryo-blue hover:text-niryo-accent underline">
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-niryo-gray px-2 py-1 rounded text-niryo-accent font-mono text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-niryo-gray rounded-lg p-4 overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-niryo-blue pl-4 italic text-gray-400 mb-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {issue.content || ''}
            </ReactMarkdown>
          </div>

          {issue.metadata?.tags && issue.metadata.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-niryo-gray">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {issue.metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-niryo-gray rounded-full text-sm text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-niryo-gray">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Issue #{issue.id}
              </div>
              <a
                href={`https://github.com/${import.meta.env.VITE_GITHUB_OWNER}/${import.meta.env.VITE_GITHUB_REPO}/issues/${issue.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-niryo-blue hover:text-niryo-accent transition-colors"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default Post
