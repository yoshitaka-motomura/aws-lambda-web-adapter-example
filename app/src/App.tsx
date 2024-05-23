import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Appheader from './components/AppHeader'
import './App.css'
function App() {
  return (
    <div className="min-h-full bg-slate-50">
      <Appheader />
      <main className="mt-5 h-full max-h-full lg:container lg:mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
