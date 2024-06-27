
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
import CreateCourse from './courseCreate';
import Load from './load';
import Show from './showCourse';

function App() {
  return <div id='body' style={{backgroundColor:"#F5F5F5"}}>
    
    
    <Router>
    <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/courseCreate' element={<CreateCourse/>}/>
        <Route path='/showCourse' element={<Show/>}/>
        <Route path='/load' element={<Load/>}/>
      </Routes>
    </Router>
    
    
  </div>
}

export default App
