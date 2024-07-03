import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";

function NavBar() {
  let navigate = useNavigate();
  let location = useLocation();
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

useEffect(() => {
  fetch('http://localhost:3001/admin/courses/admin/me', {
    method: 'get',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    }
  }).then(async (res) => {
    const data = await res.json();
    if (data.username) {
      setAdmin(data.username); // Ensure this is a string
    }
  }).catch(error => console.error('Error fetching admin data:', error));
}, []);

useEffect(() => {
  fetch('http://localhost:3001/users/courses/users/me', {
    method: 'get',
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
    }
  }).then(async (res) => {
    const data = await res.json();
    if (data.username) {
      console.log(data.username);
      setUser(data.username); // Ensure this is a string
    }
  }).catch(error => console.error('Error fetching user data:', error));
}, []);

  if (admin || user) {
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
          <Typography>{admin || user}</Typography>
          <Button
            variant="contained"
            style={{ margin: "4px" }}
            onClick={() => {
              localStorage.setItem('token', null);
              window.location = '/';
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    );
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

      {location.pathname !== '/' && (
        <div>
          <Button
            variant="contained"
            style={{ margin: "4px" }}
            onClick={() => {
              navigate(`/signin`);
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            style={{ margin: "4px" }}
            onClick={() => {
              navigate(`/signup`);
            }}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
