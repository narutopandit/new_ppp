import Card from "@mui/material/Card";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



function CreateCourse(){
    const  navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState();
    const [image,setImage] = useState("");
    


    
    return (<Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#F5F5F5",
          
        }}
      >
        <Box style={{ width: "60rem" ,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Card variant="outlined" style={{ padding: "2rem", width: "30rem" }}>
            <Typography variant="h5" style={{ marginBottom: "1rem" }}>
              Fill in the details to create the course
            </Typography>
            <TextField
              id="outlined-Title"
              label="Title"
              placeholder="Title"
              fullWidth
              margin="normal"
              onChange={(t) => {
                setTitle(t.target.value);
              }}
            />
            <TextField
              id="outlined-Description"
              label="Description"
              placeholder="Description"
              fullWidth
              margin="normal"
              onChange={(d) => {
                setDescription(d.target.value);
              }}
            />
            <TextField
              id="outlined-Price"
              label="Price"
              placeholder="Price"
              fullWidth
              margin="normal"
              onChange={(t) => {
                setPrice(t.target.value);
              }}
            />
            <TextField
              id="outlined-Image"
              label="Image"
              placeholder="Image"
              fullWidth
              margin="normal"
              onChange={(t) => {
                setImage(t.target.value);
              }}
            />
            <Button
              variant="contained"
              style={{ marginTop: "1rem" }}
              onClick={async()=>{
                fetch('http://localhost:3001/admin/courses',{
                   method: 'POST',
                   body:JSON.stringify({
                    title:title,
                    description:description,
                    price:price,
                    imageLink:image,
                    published:'true',
                   }),
                   headers:{
                       'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem("token")
                   }
                   
                }).then(async(res)=>{
                    return res.json().then((data)=>{
                        console.log(data);
                        navigate('/showCourse')
                    })
                })
           }}
            >
              Create
            </Button>
          </Card>
        </Box>
      </Box>)
}

export default CreateCourse