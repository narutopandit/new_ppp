import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Choice(){

    const navigate = useNavigate();
    let user='users';
    let admin='admin';

    return<Card variant="contained" style={{display:'flex',justifyContent:'center'}}>
        <Button variant="contained" onClick={()=>{
            localStorage.setItem('role',null);
            localStorage.setItem('role',user);
            navigate(`/signup`)
        }} style={{margin:'10px'}}>User</Button>
        <Button variant="contained" onClick={()=>{
            localStorage.setItem('role',null);
            localStorage.setItem('role',admin);
            navigate(`/signup`)
        }} style={{margin:'10px'}}>Admin</Button>
    </Card>
}

export default Choice

