import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGitHubAuth } from '../hooks/useGitHubAuth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, isConfigured, logout, startDeviceFlow } = useGitHubAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/guide', label: 'Guide' },
    { path: '/submit', label: 'Submit Work' },
    { path: '/about', label: 'About' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogin = async () => {
    setLoginError(null)
    const result = await startDeviceFlow()
    if (result.success) {
      setShowLoginModal(true)
    } else if (result.notConfigured) {
      setLoginError(result.error)
    } else {
      setLoginError(result.error || 'Failed to start login')
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-niryo-darker/90 backdrop-blur-md border-b border-niryo-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-niryo-blue to-niryo-accent flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Niryo NED</span>
                <span className="hidden sm:block text-xs text-gray-400">AI & Robotics Lab, CSE - KUET</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-niryo-blue/20 text-niryo-blue'
                      : 'text-gray-300 hover:text-white hover:bg-niryo-gray/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-8 h-8 rounded-full border-2 border-niryo-blue"
                  />
                  <span className="text-sm text-gray-300">{user.login}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  {loginError && (
                    <span className="text-xs text-niryo-orange" title={loginError}>
                      Login not available
                    </span>
                  )}
                  <button onClick={handleLogin} className="btn-primary text-sm">
                    Login with GitHub
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-niryo-gray/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-niryo-darker border-t border-niryo-blue/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-niryo-blue/20 text-niryo-blue'
                      : 'text-gray-300 hover:text-white hover:bg-niryo-gray/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-niryo-gray">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-8 h-8 rounded-full border-2 border-niryo-blue"
                      />
                      <span className="text-sm text-gray-300">{user.login}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsOpen(false) }}
                      className="w-full text-left px-3 py-2 text-gray-400 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { handleLogin(); setIsOpen(false) }}
                    className="w-full btn-primary text-sm"
                  >
                    Login with GitHub
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  )
}

const LoginModal = ({ onClose }) => {
  const { userCode, verificationUri, pollForToken, cancelLogin } = useGitHubAuth()
  const [status, setStatus] = useState('pending')
  const [error, setError] = useState(null)

  useEffect(() => {
    let intervalId
    let timeoutId

    const poll = async () => {
      const result = await pollForToken()
      if (result.success) {
        setStatus('success')
        setTimeout(onClose, 1500)
      } else if (result.pending) {
        intervalId = setTimeout(poll, 5000)
      } else if (result.slowDown) {
        intervalId = setTimeout(poll, 10000)
      } else {
        setError(result.error)
        setStatus('error')
      }
    }

    intervalId = setTimeout(poll, 5000)
    timeoutId = setTimeout(() => {
      setStatus('expired')
      cancelLogin()
    }, 600000)

    return () => {
      clearTimeout(intervalId)
      clearTimeout(timeoutId)
    }
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userCode)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-niryo-gray border border-niryo-blue/30 rounded-2xl p-8 max-w-md w-full mx-4">
        {status === 'success' ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-niryo-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-niryo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome!</h3>
            <p className="text-gray-400">Successfully logged in with GitHub</p>
          </div>
        ) : status === 'error' ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Login Failed</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button onClick={onClose} className="btn-secondary">
              Try Again
            </button>
          </div>
        ) : status === 'expired' ? (
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Code Expired</h3>
            <p className="text-gray-400 mb-4">The device code has expired. Please try again.</p>
            <button onClick={onClose} className="btn-primary">
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-niryo-blue/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-niryo-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Login with GitHub</h3>
              <p className="text-gray-400 text-sm">Follow these steps to authenticate</p>
            </div>

            <div className="space-y-4">
              <div className="bg-niryo-darker rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">1. Go to:</p>
                <a
                  href={verificationUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-niryo-blue hover:underline break-all"
                >
                  {verificationUri}
                </a>
              </div>

              <div className="bg-niryo-darker rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">2. Enter this code:</p>
                <div className="flex items-center justify-between">
                  <code className="text-2xl font-mono font-bold text-niryo-accent tracking-wider">
                    {userCode}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-niryo-gray transition-colors"
                    title="Copy to clipboard"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center">
                3. Click <span className="font-semibold text-white">"Authorize GitHub"</span> on the page
              </p>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-niryo-blue border-t-transparent rounded-full animate-spin"></div>
                <span>Waiting for authentication...</span>
              </div>
            </div>

            <button
              onClick={() => { cancelLogin(); onClose() }}
              className="w-full mt-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
