import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useIssues } from '../hooks/useIssues'
import PostCard from '../components/PostCard'

const Home = () => {
  const { issues, loading } = useIssues(1, 6, 'project')

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Explore Projects',
      description: 'Discover innovative projects built with Niryo NED by researchers at KUET and beyond.',
      link: '/explore'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Learn & Guide',
      description: 'Access comprehensive tutorials and guides for getting started with Niryo NED.',
      link: '/guide'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: 'Share Your Work',
      description: 'Contribute to the community by sharing your projects, solutions, and discoveries.',
      link: '/submit'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Niryo NED Community | KUET Robotics Lab</title>
        <meta name="description" content="A community platform for researchers and enthusiasts working with Niryo NED robot at KUET" />
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-hero-pattern"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-niryo-blue/10 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-niryo-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-niryo-blue/10 border border-niryo-blue/30 rounded-full text-niryo-blue text-sm font-medium mb-6">
              🤖 KUET Robotics Lab
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Niryo NED</span>
            <br />
            <span className="text-white">Community Hub</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
            A collaborative platform for researchers, students, and enthusiasts working with the 
            Niryo NED collaborative robot at <span className="text-niryo-blue font-semibold">KUET</span>. 
            Share your work, learn from others, and push the boundaries of robotics together.
          </p>

          <div className="mb-12">
            <img
              src="https://niryo.com/wp-content/uploads/2022/08/header-ned2.png"
              alt="Niryo NED Robot"
              className="max-w-md mx-auto w-full"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hidden w-full max-w-md mx-auto h-64 bg-gradient-to-br from-niryo-blue/30 to-niryo-accent/30 rounded-2xl items-center justify-center">
              <svg className="w-48 h-48 text-niryo-blue/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/explore" className="btn-primary text-lg px-8 py-3">
              Explore Projects
            </Link>
            <Link to="/guide" className="btn-secondary text-lg px-8 py-3">
              Get Started
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">6DOF</div>
              <div className="text-sm text-gray-400">Degrees of Freedom</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">500g</div>
              <div className="text-sm text-gray-400">Payload Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">540mm</div>
              <div className="text-sm text-gray-400">Max Reach</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-niryo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-20 px-4 bg-niryo-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you're a seasoned researcher or just getting started with robotics, 
              our community has resources for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-niryo-blue/10 flex items-center justify-center text-niryo-blue mb-6 group-hover:bg-niryo-blue/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Latest Projects</h2>
              <p className="text-gray-400">See what the community is building</p>
            </div>
            <Link to="/explore" className="btn-secondary hidden md:block">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-niryo-gray rounded-lg mb-4"></div>
                  <div className="h-6 bg-niryo-gray rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-niryo-gray rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue) => (
                <PostCard key={issue.id} issue={issue} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/explore" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-niryo-blue/10 to-niryo-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Share Your Work?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join our growing community of robotics enthusiasts at KUET. 
            Whether you've built something amazing or need help solving a problem, 
            there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/submit" className="btn-primary text-lg px-8 py-3">
              Submit Your Project
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-3">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
