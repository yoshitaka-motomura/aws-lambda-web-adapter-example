import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Appheader from './components/AppHeader'
import './App.css'
function App() {
  return (
    <>
      <Appheader />
      <main className='lg:container lg:mx-auto mt-5 max-h-full h-full'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App
