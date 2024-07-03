import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
function Load(){
    const navigate = useNavigate();
    const [search,setSearch] =useState("");
    let role = localStorage.getItem('role');
    return <div style={{display:'flex',justifyContent:'center'}}>
        <Card variant="contained" style={{margin:'10px',border:'0.2px solid black'}}>
            <div style={{display:'flex'}}>
                <TextField
            id="outlined-Search"
            label="Search"
            placeholder="Search by CourseId"
            style={{ width: "20rem", padding: "10px", marginTop: "10px"}}
            onChange={(s)=>{
              setSearch(s.target.value);
            }}
          />
          <Button variant="contained" style={{margin:'43px 40px 0 0',height:'30px'}}>Search</Button>
            </div>
        
            {role !=='users'&&(<Button variant="contained" style={{margin:'5px'}} onClick={()=>{
                navigate('/createCourse');
            }}>Create Course</Button>)}
            {role =='users'&&(<Button variant="contained" style={{margin:'5px'}} onClick={()=>{
                navigate('/purchaseCourse');
            }}>My Purchase Courses</Button>)}
            <Button variant="contained" style={{margin:'5px'}} onClick={()=>
                navigate('/showCourse')
            }>Show Course</Button>
            

        </Card>
    </div>
}
export default Load