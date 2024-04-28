import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Appheader from './components/AppHeader'
function App() {
  return (
    <>
      <Appheader />
      <main className='lg:container lg:mx-auto mt-5'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  )
}

export default App
