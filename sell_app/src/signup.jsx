import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
function Signup() {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  localStorage.setItem('token',null)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: "25rem" }}>
        <Typography style={{ marginLeft: "60px" }}>
          Welcome to Coursera.Sign up below
        </Typography>
        <Card variant="outlined">
          <TextField
            id="outlined-Email"
            label="Email"
            placeholder="example@gmail.com"
            style={{ width: "90%", padding: "10px", marginTop: "10px" }}
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
          />
          <br />
          <TextField
            id="outlined-Password"
            label="password"
            type="password"
            style={{ width: "90%", padding: "10px" }}
            onChange={(p)=>{
              setPassword(p.target.value);
            }}
          />
          <br />
          <Button variant="contained" style={{ margin: "10px" }} onClick={async()=>{
            let role=localStorage.getItem('role');
            if(role==='admin'){
              fetch(`http://localhost:3001/${role}/signup`,{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                username:email,
                password:password
              }) 
            }).then(async(res)=>{
              return res.json().then((data)=>{
                if(data.message){
                  navigate(`/signin`);
                }else{
                  alert(data.error);
                }
              })
            })
            }else{
              fetch(`http://localhost:3001/${role}/signup`,{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                  username:email,
                  password:password,
                  purchaseCourse:[]
                }) 
              }).then(async(res)=>{
                return res.json().then((data)=>{
                  if(data.message){
                    navigate(`/signin`);
                  }
                })
              })
            }
            
          }}>
            SignUp
          </Button>
        </Card>
      </div>
    </div>
  );
}
export default Signup;
