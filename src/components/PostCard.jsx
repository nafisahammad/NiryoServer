import { Link } from 'react-router-dom'

const PostCard = ({ project }) => {
  const categoryColors = {
    project: 'bg-niryo-accent/20 text-niryo-accent',
    guide: 'bg-niryo-blue/20 text-niryo-blue',
    question: 'bg-niryo-orange/20 text-niryo-orange',
  }

  const getCategoryStyle = (category) => {
    return categoryColors[category] || 'bg-niryo-gray text-gray-400'
  }

  const formatDate = (date) => {
    const d = date instanceof Date ? date : new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Link to={`/post/${project.id}`}>
      <article className="card group hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
        {project.images?.[0] && (
          <div className="relative h-48 rounded-lg overflow-hidden mb-4">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-niryo-darker/80 to-transparent"></div>
          </div>
        )}

        <div className="flex items-center space-x-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(project.category)}`}>
            {project.category?.charAt(0).toUpperCase() + project.category?.slice(1)}
          </span>
          {project.repoUrl && (
            <span className="px-2 py-1 rounded-full bg-niryo-gray text-gray-400 text-xs">
              Has Repo
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-niryo-blue transition-colors line-clamp-2">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
            {project.description.substring(0, 150)}...
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-niryo-gray/50">
          <span className="text-sm text-gray-400">
            {project.author || 'Anonymous'}
          </span>
          <span className="text-xs text-gray-500">{formatDate(project.createdAt)}</span>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-niryo-darker rounded text-xs text-gray-400"
              >
                #{tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </article>
    </Link>
  )
}

export default PostCard
