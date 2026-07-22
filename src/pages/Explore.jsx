import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useIssues } from '../hooks/useIssues'
import PostCard from '../components/PostCard'

const Explore = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  })
  const { issues, loading, error, currentPage, totalPages, goToPage } = useIssues(1, 12, filters.category)

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'project', label: 'Projects' },
    { value: 'guide', label: 'Guides' },
    { value: 'question', label: 'Questions' },
  ]

  const filteredIssues = issues.filter(issue => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        issue.title.toLowerCase().includes(searchLower) ||
        issue.content?.toLowerCase().includes(searchLower) ||
        issue.metadata?.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    return true
  })

  return (
    <>
      <Helmet>
        <title>Explore Projects | Niryo NED Community</title>
        <meta name="description" content="Explore projects, guides, and contributions from the Niryo NED community at KUET" />
      </Helmet>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Explore</span> Projects
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover innovative work from researchers and students at KUET 
              and the global Niryo NED community.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects, guides, tags..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="input-field pl-12"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="input-field"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8">
              <p className="text-red-400">Error loading projects: {error}</p>
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-niryo-gray rounded-lg mb-4"></div>
                  <div className="h-6 bg-niryo-gray rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-niryo-gray rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400">
                {filters.search || filters.category
                  ? 'Try adjusting your filters'
                  : 'Be the first to share your work!'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.map((issue) => (
                  <PostCard key={issue.id} issue={issue} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-niryo-gray hover:bg-niryo-blue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === i + 1
                          ? 'bg-niryo-blue text-white'
                          : 'bg-niryo-gray hover:bg-niryo-blue/20'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-niryo-gray hover:bg-niryo-blue/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Explore
