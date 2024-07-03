
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
import CreateCourse from './createCourse';
import Load from './load';
import Show from './showCourse';
import Update from './updateCourse';
import Choice from './landing';
import Purchase from './purchase';
import PurchaseCourse from './purchaseCourse';

function App() {
  return <div id='body' style={{backgroundColor:"#F5F5F5"}}>
    
    
    <Router>
    <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Choice/>}/>
        <Route path='/signin/' element={<SignIn/>}/>
        <Route path='/signup/' element={<Signup/>}/>
        <Route path='/createCourse' element={<CreateCourse/>}/>
        <Route path='/showCourse' element={<Show/>}/>
        <Route path='/updateCourse/:Id' element={<Update/>}/>
        <Route path='/load/' element={<Load/>}/>
        <Route path='/purchase/:Id' element={<Purchase/>}/>
        <Route path='/purchaseCourse' element={<PurchaseCourse/>}/>
      </Routes>
    </Router>
    
    
  </div>
}

export default App
 
