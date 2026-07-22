import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-niryo-darker border-t border-niryo-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-niryo-blue to-niryo-accent flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Niryo NED</span>
                <span className="block text-xs text-gray-400">KUET Robotics Lab</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-md">
              A community platform for researchers and enthusiasts working with the Niryo NED robot 
              at KUET (Khulna University of Engineering & Technology). Share your projects, 
              learn from others, and contribute to the growing field of collaborative robotics.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-niryo-blue transition-colors">
                  Explore Projects
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-400 hover:text-niryo-blue transition-colors">
                  Niryo NED Guide
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-gray-400 hover:text-niryo-blue transition-colors">
                  Submit Your Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-niryo-blue transition-colors">
                  About KUET Lab
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Software</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://niryo.com/ned2-ns-windows64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  NiryoStudio (Windows)
                </a>
              </li>
              <li>
                <a
                  href="https://niryo.com/ned2-ns-macintel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  NiryoStudio (Mac)
                </a>
              </li>
              <li>
                <a
                  href="https://niryo.com/niryostudio-linux-amd64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  NiryoStudio (Linux)
                </a>
              </li>
              <li>
                <a
                  href="https://niryo.com/how-to-update-ned2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  Flash Robot Software
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.niryo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  Official Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://academy.niryo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  Niryo Academy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/NiryoRobotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  Niryo GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.kuet.ac.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-niryo-blue transition-colors"
                >
                  KUET Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-niryo-gray">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Niryo NED Community | KUET Robotics Lab. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/your-username/NiryoServer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="w-2 h-2 rounded-full bg-niryo-accent animate-pulse"></span>
                <span>Powered by GitHub Pages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
