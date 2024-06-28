import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate=useNavigate();
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
          Welcome to Coursera.Sign In below
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
            fetch('http://localhost:3001/admin/login',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                username:email,
                password:password
              }
            }).then(async(res)=>{
              return res.json().then((data)=>{
                let token=data.token;
                localStorage.setItem('token',token);
                if(data.token){
                  console.log(data);
                  window.location='/load'
                }
              })
            })
          }}>
            SignIn
          </Button>
        </Card>
      </div>
    </div>
  );
}
export default SignIn;
