import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const navigate = useNavigate();
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
            Email
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
            Password
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
            fetch('http://localhost:3001/admin/signup',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                username:Email,
                password:Password
              })
            }).then(async(res)=>{
              return res.json().then((data)=>{
                let token=data.token;
                localStorage.setItem('token',token);
                if(data.token){
                  navigate('/signin');
                }
              })
            })
          }}>
            SignUp
          </Button>
        </Card>
      </div>
    </div>
  );
}
export default Signup;
