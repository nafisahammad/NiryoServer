import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Guide = () => {
  const softwareLinks = [
    {
      name: 'NiryoStudio',
      description: 'Visual programming interface for Niryo robots',
      links: [
        { label: 'Windows 64-bit', url: 'https://niryo.com/ned2-ns-windows64', icon: '🖥️' },
        { label: 'Mac Intel', url: 'https://niryo.com/ned2-ns-macintel', icon: '🍎' },
        { label: 'Linux ARM64 (Debian)', url: 'https://niryo.com/ns-ned2-linux-arm64', icon: '🐧' },
        { label: 'Linux ARM64 (AppImage)', url: 'https://niryo.com/linux-arm64-appimage', icon: '📦' },
        { label: 'Linux AMD64 (Debian)', url: 'https://niryo.com/niryostudio-linux-amd64', icon: '🐧' },
        { label: 'Linux AMD64 (AppImage)', url: 'https://niryo.com/niryostudio-linux-appimage', icon: '📦' },
      ]
    },
    {
      name: 'Robot Software',
      description: 'Firmware images for SD card installation',
      links: [
        { label: 'SD Card Image (16GB)', url: 'https://niryo.com/ned2-16go', icon: '💾' },
        { label: 'SD Card Image (32GB)', url: 'https://niryo.com/ned2-32go', icon: '💾' },
        { label: 'How to Flash', url: 'https://niryo.com/how-to-update-ned2/', icon: '📖' },
      ]
    },
    {
      name: '3D Models',
      description: 'CAD files for custom end-effectors and integration',
      links: [
        { label: 'STL Files', url: 'https://niryo.com/ned2-stl', icon: '📐' },
        { label: 'STEP Files', url: 'https://niryo.com/ned2-step', icon: '📦' },
      ]
    },
    {
      name: 'Documentation',
      description: 'Official Niryo documentation and learning resources',
      links: [
        { label: 'Official Docs', url: 'https://docs.niryo.com/', icon: '📚' },
        { label: 'Niryo Academy', url: 'https://academy.niryo.com/', icon: '🎓' },
        { label: 'GitHub Repository', url: 'https://github.com/NiryoRobotics', icon: '💻' },
      ]
    }
  ]

  const sections = [
    {
      title: 'Getting Started with Niryo NED',
      description: 'Everything you need to know to set up and start using your Niryo NED robot.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      items: [
        { title: 'Unboxing & Hardware Setup', description: 'Physical setup of your Niryo NED robot' },
        { title: 'Software Installation', description: 'Installing NiryoStudio and required drivers' },
        { title: 'First Connection', description: 'Connecting to your robot for the first time' },
        { title: 'Basic Calibration', description: 'Calibrating joints and setting up workspace' },
      ]
    },
    {
      title: 'Programming Niryo NED',
      description: 'Learn how to program your robot using various methods and languages.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      items: [
        { title: 'NiryoStudio Interface', description: 'Visual programming with block-based interface' },
        { title: 'Python API', description: 'Program using the Python API for advanced control' },
        { title: 'ROS Integration', description: 'Working with Robot Operating System' },
        { title: 'G-Code Support', description: 'Using G-code commands for CNC-like operations' },
      ]
    },
    {
      title: 'Applications & Projects',
      description: 'Explore real-world applications and project ideas for Niryo NED.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: [
        { title: 'Pick & Place Tasks', description: 'Automated object sorting and placement' },
        { title: 'Vision Integration', description: 'Computer vision with cameras and OpenCV' },
        { title: 'Educational Demos', description: 'Teaching robotics concepts' },
        { title: 'Research Applications', description: 'Advanced research use cases' },
      ]
    },
    {
      title: 'Advanced Topics',
      description: 'Deep dive into advanced features and customization options.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      items: [
        { title: 'Custom End-Effectors', description: 'Designing and attaching custom grippers' },
        { title: 'Trajectory Planning', description: 'Optimizing robot movement paths' },
        { title: 'Force Control', description: 'Working with force feedback and compliance' },
        { title: 'Multi-Robot Systems', description: 'Coordinating multiple robots' },
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Niryo NED Guide | KUET Robotics Lab</title>
        <meta name="description" content="Comprehensive guides and tutorials for working with Niryo NED robot at KUET" />
      </Helmet>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Niryo NED</span> Guide
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive tutorials and documentation for the Niryo NED collaborative robot. 
              From basic setup to advanced applications, we've got you covered.
            </p>
          </div>

          {/* Niryo NED Robot Image */}
          <div className="mb-12">
            <div className="relative bg-gradient-to-r from-niryo-blue/20 to-niryo-accent/20 rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center gap-8 p-8">
                <div className="flex-1">
                  <img
                    src="https://niryo.com/wp-content/uploads/2022/08/header-ned2.png"
                    alt="Niryo NED Robot"
                    className="w-full max-w-lg mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden w-full max-w-lg mx-auto h-64 bg-gradient-to-br from-niryo-blue/30 to-niryo-accent/30 rounded-xl items-center justify-center">
                    <svg className="w-48 h-48 text-niryo-blue/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">About Niryo NED</h2>
                  <p className="text-gray-400 mb-4">
                    The Niryo NED is a 6-axis collaborative robot (cobot) designed for education, 
                    research, and light industrial applications. With its intuitive programming interface 
                    and advanced capabilities, it's perfect for learning robotics at KUET.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-niryo-darker/50 rounded-lg p-4">
                      <div className="text-2xl font-bold gradient-text">6</div>
                      <div className="text-sm text-gray-400">Degrees of Freedom</div>
                    </div>
                    <div className="bg-niryo-darker/50 rounded-lg p-4">
                      <div className="text-2xl font-bold gradient-text">500g</div>
                      <div className="text-sm text-gray-400">Payload</div>
                    </div>
                    <div className="bg-niryo-darker/50 rounded-lg p-4">
                      <div className="text-2xl font-bold gradient-text">540mm</div>
                      <div className="text-sm text-gray-400">Reach</div>
                    </div>
                    <div className="bg-niryo-darker/50 rounded-lg p-4">
                      <div className="text-2xl font-bold gradient-text">±0.1mm</div>
                      <div className="text-sm text-gray-400">Repeatability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Software Downloads Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              <span className="gradient-text">Software Downloads</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {softwareLinks.map((category, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{category.description}</p>
                  <div className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-niryo-darker/50 rounded-lg hover:bg-niryo-gray/50 transition-colors group"
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span className="text-gray-300 group-hover:text-niryo-blue transition-colors">
                          {link.label}
                        </span>
                        <svg className="w-4 h-4 text-gray-500 group-hover:text-niryo-blue ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="card">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-niryo-blue/10 flex items-center justify-center text-niryo-blue flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 ml-0 md:ml-18">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-niryo-darker/50 rounded-lg p-4 hover:bg-niryo-gray/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-niryo-blue group-hover:bg-niryo-accent transition-colors"></div>
                        <div>
                          <h3 className="font-medium text-white group-hover:text-niryo-blue transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="card max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Have a Guide to Share?</h3>
              <p className="text-gray-400 mb-6">
                Help the community by sharing your knowledge. Submit your own tutorials 
                and guides for Niryo NED.
              </p>
              <Link to="/submit" className="btn-primary">
                Submit a Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Guide
