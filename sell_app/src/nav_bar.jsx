import Button from '@mui/material/Button';




function NavBar(){
    return <div style={{display:'flex',justifyContent:'space-between',borderBottom:'0.5px solid black'}}>
        <div>
        
            <h3 style={{color:"#0062e4",fontFamily: "OpenSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",fontWeight:'bolder'}}>
            COURSERA
            </h3>
        </div>
    
        <div >
        <Button variant="contained"style={{margin:'4px'}}>SignIn</Button>
        <Button variant="contained"style={{margin:'4px'}}>SignUp</Button>
        </div>
   