
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import './App.css'
import Signup from './signup'
import SignIn from './signin';
import NavBar from './nav_bar'

function App() {
  return <div id='body' style={{backgroundColor:"#F5F5F5"}}>
    
    
    <Router>
    <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
    
    
  </div>
}

export default App
