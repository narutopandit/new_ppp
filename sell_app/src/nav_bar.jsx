import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function NavBar() {
  let navigate=useNavigate();
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
