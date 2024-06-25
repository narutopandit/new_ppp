import { useState } from 'react'

import './App.css'
import Signup from './signup'
import NavBar from './nav_bar'

function App() {
  return <div id='body' style={{backgroundColor:"#F5F5F5"}}>
    <NavBar></NavBar>
    <Signup></Signup>
    
  </div>
}

export default App
