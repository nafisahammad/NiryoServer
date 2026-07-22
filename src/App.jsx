import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Post from './pages/Post'
import Submit from './pages/Submit'
import Guide from './pages/Guide'
import About from './pages/About'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-niryo-darker">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
