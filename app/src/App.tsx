import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
function App() {
  return (
    <>
      <main>
        <h1>Lambda Web Adapter</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href='/about'>About</a></li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </main>
    </>
  )
}

export default App
