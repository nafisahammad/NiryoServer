import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Niryo NED Community - KUET</title>
        <meta name="description" content="Learn about the AI & Robotics Lab, CSE Department at KUET and our work with Niryo NED collaborative robots" />
      </Helmet>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">AI & Robotics</span> Lab
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advancing robotics research and education at Khulna University of Engineering & Technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The AI & Robotics Lab, Department of Computer Science & Engineering at KUET is dedicated to advancing the field of collaborative robotics 
                through research, education, and community engagement. With our Niryo NED robots, 
                we aim to:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    Provide hands-on experience with industrial-grade collaborative robots
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    Foster innovation in human-robot interaction and collaboration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    Build a community of robotics enthusiasts and researchers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-niryo-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    Bridge the gap between academic research and industry applications
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">Lab Facilities</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-niryo-blue"></span>
                    Niryo NED 6-Axis Collaborative Robots
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-niryo-blue"></span>
                    Computer Vision Workstations
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-niryo-blue"></span>
                    ROS Development Environment
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-niryo-blue"></span>
                    3D Printing & Prototyping Tools
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-niryo-blue"></span>
                    Motion Capture System
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4">Research Areas</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-niryo-blue/10 text-niryo-blue rounded-full text-sm">
                    Collaborative Robotics
                  </span>
                  <span className="px-3 py-1 bg-niryo-accent/10 text-niryo-accent rounded-full text-sm">
                    Computer Vision
                  </span>
                  <span className="px-3 py-1 bg-niryo-orange/10 text-niryo-orange rounded-full text-sm">
                    Motion Planning
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 bg-niryo-blue/10 text-niryo-blue rounded-full text-sm">
                    Human-Robot Interaction
                  </span>
                  <span className="px-3 py-1 bg-niryo-accent/10 text-niryo-accent rounded-full text-sm">
                    Education
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="card max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-niryo-blue to-niryo-accent flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Nafis Ahammad</h2>
              <p className="text-niryo-blue mb-4">Built this platform</p>
              <p className="text-gray-400">
                Developed the Niryo NED Community Hub to connect researchers, students, and enthusiasts 
                working with collaborative robotics at KUET.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-niryo-blue/10 flex items-center justify-center text-niryo-blue flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Address</h3>
                    <p className="text-gray-400">
                      Department of Computer Science & Engineering<br />
                      Khulna University of Engineering & Technology<br />
                      Khulna 9208, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-niryo-blue/10 flex items-center justify-center text-niryo-blue flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-400">robotics@kuet.ac.bd</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-niryo-blue/10 flex items-center justify-center text-niryo-blue flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">GitHub</h3>
                    <a
                      href="https://github.com/kuet-robotics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-niryo-blue hover:text-niryo-accent transition-colors"
                    >
                      github.com/kuet-robotics
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get Involved</h2>
              <p className="text-gray-400 mb-6">
                We welcome students, researchers, and enthusiasts who are interested in robotics. 
                Whether you're looking to collaborate on research or just want to learn, 
                there's a place for you at our lab.
              </p>
              <div className="space-y-4">
                <div className="card bg-gradient-to-r from-niryo-blue/5 to-niryo-accent/5">
                  <h3 className="font-semibold text-white mb-2">For Students</h3>
                  <p className="text-gray-400 text-sm">
                    Join our lab as a research assistant or work on your thesis projects 
                    with our robotics equipment.
                  </p>
                </div>
                <div className="card bg-gradient-to-r from-niryo-blue/5 to-niryo-accent/5">
                  <h3 className="font-semibold text-white mb-2">For Researchers</h3>
                  <p className="text-gray-400 text-sm">
                    Collaborate on research projects and access our facilities 
                    for your experiments.
                  </p>
                </div>
                <div className="card bg-gradient-to-r from-niryo-blue/5 to-niryo-accent/5">
                  <h3 className="font-semibold text-white mb-2">For Industry</h3>
                  <p className="text-gray-400 text-sm">
                    Partner with us for applied research and development 
                    in collaborative robotics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
