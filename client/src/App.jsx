import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Header from './Components/Header'
import Footer from './Components/Footer'
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App