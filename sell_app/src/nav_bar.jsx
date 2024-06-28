import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  let navigate=useNavigate();
  const [admin,setAdmin] = useState(null);
    useEffect(()=>{
        fetch('http://localhost:3001/admin/courses/admin/me',{
            method:'get',
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then(async(res)=>{
            return res.json().then((data)=>{
                console.log(data)
                if(data.username){
                  setAdmin(data.username);
                }
            })
        })
    },[])
    if(admin){
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "0.01px solid black",
          }}
        >
          <div>
            <h3
              style={{
                color: "#0062e4",
                fontFamily:
                  "OpenSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
                fontWeight: "bolder",
              }}
            >
              COURSERA
            </h3>
          </div>
    
          <div>
            <Typography>{admin}</Typography>
            <Button
              variant="contained"
              style={{ margin: "4px" }}
              onClick={() => {
                localStorage.setItem('token',null);
                window.location='/signin'
              }}
            >
              log out
            </Button>
          </div>
        </div>
        )
    }
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "0.01px solid black",
      }}
    >
      <div>
        <h3
          style={{
            color: "#0062e4",
            fontFamily:
              "OpenSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
            fontWeight: "bolder",
          }}
        >
          COURSERA
        </h3>
      </div>

      <div>
        <Button
          variant="contained"
          style={{ margin: "4px" }}
          onClick={() => {
            navigate('/signin');
          }}
        >
          SignIn
        </Button>
        <Button
          variant="contained"
          style={{ margin: "4px" }}
          onClick={() => {
            navigate('signup');
          }}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
}
export default NavBar;
