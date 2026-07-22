import { Link } from 'react-router-dom'

const PostCard = ({ issue }) => {
  const categoryColors = {
    project: 'bg-niryo-accent/20 text-niryo-accent',
    guide: 'bg-niryo-blue/20 text-niryo-blue',
    question: 'bg-niryo-orange/20 text-niryo-orange',
    featured: 'bg-purple-500/20 text-purple-400',
  }

  const getCategoryStyle = (category) => {
    return categoryColors[category] || 'bg-niryo-gray text-gray-400'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const category = issue.metadata?.category || issue.labels.find(l => 
    ['project', 'guide', 'question'].includes(l)
  ) || 'project'

  return (
    <Link to={`/post/${issue.id}`}>
      <article className="card group hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
        {issue.metadata?.images?.[0] && (
          <div className="relative h-48 rounded-lg overflow-hidden mb-4">
            <img
              src={issue.metadata.images[0]}
              alt={issue.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-niryo-darker/80 to-transparent"></div>
          </div>
        )}

        {!issue.metadata?.images?.[0] && (
          <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-niryo-blue/20 to-niryo-accent/20 flex items-center justify-center">
            <svg className="w-16 h-16 text-niryo-blue/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          {issue.metadata?.repo_url && (
            <span className="px-2 py-1 rounded-full bg-niryo-gray text-gray-400 text-xs">
              Has Repo
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-niryo-blue transition-colors line-clamp-2">
          {issue.title}
        </h3>

        {issue.content && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
            {issue.content.substring(0, 150)}...
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-niryo-gray/50">
          <div className="flex items-center space-x-2">
            <img
              src={issue.authorAvatar}
              alt={issue.author}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-400">
              {issue.metadata?.github_username || issue.metadata?.author || issue.author}
            </span>
          </div>
          <span className="text-xs text-gray-500">{formatDate(issue.createdAt)}</span>
        </div>

        {issue.metadata?.tags && issue.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {issue.metadata.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-niryo-darker rounded text-xs text-gray-400"
              >
                #{tag}
              </span>
            ))}
            {issue.metadata.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{issue.metadata.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </article>
    </Link>
  )
}

export default PostCard
