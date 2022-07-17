import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Cryptocurrency from './components/Cryptocurrency'
import CryptoDetails from './components/CryptoDetails'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import News from './components/News'
import './Styles/App/App.css'

const App: React.FC = () => {
  return (

    <div className='app'>

      <div className="">
        <Navbar />
      </div>

      <div className="main">

        <Routes>

          <Route
            path='/'
            element={<HomePage />}
          />

          <Route
            path='/cryptocurrency'
            element={<Cryptocurrency />}
          />

          <Route
            path='/crypto/:coinId'
            element={<CryptoDetails />}
          />

          <Route
            path='/news'
            element={<News />}
          />

        </Routes>


      </div>

      <div className="footer">
        <div> 
          <p>Crptoverse @ 2022</p>
          <p>All rights reserved</p>
        </div>
      </div>


    </div>
  )
}

export default App