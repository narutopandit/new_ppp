
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

function Signup(){
    return <div style={{display:'flex',justifyContent:'center',alignItems:"center",height:"100vh"}}>
        <div style={{width:"25rem"}}>
        
        <Card variant="outlined">
            <TextField
          Email
          id="outlined-Email"
          label="Email"
          defaultValue="example@gmail.com"
          style={{width:"90%",padding:"10px",marginTop:"10px"}}
        />
        <br />
        <TextField
          Password
          id="outlined-Password"
          label="password"
          type='password'
          style={{width:"90%",padding:"10px"}}
        />
        <br />
        <Button variant="contained"style={{margin:"10px"}}>SignUp</Button>
        </Card>
        
        
    </div> 
    </div> 
}
export default Signup