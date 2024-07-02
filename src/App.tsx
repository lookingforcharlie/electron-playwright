import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import HomePage from './components/HomePage'
import Navbar from './components/Nav'
import ServicePage from './components/ServicePage'

const App: React.FC = () => {
  return (
    <Router>
      <div className='flex'>
        <Navbar />
        <div className='ml-64 p-8 w-full"'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/services' element={<ServicePage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
