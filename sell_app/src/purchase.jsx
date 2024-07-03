import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";




function Purchase(){
    const {Id} = useParams();
    const [data,setData] = useState("");
    useEffect(()=>{
        fetch(`http://localhost:3001/users/courses/${Id}`,{
            method:'POST',
        
        headers:{
            'Content-Type': 'application/json',
             "Authorization": "Bearer " + localStorage.getItem("token")
        }}
    ).then(async(res)=>{
        return res.json().then((data)=>{
            if(data.message){
                console.log(data);
                setData(data.message);
            }else{
                console.log(data);
                setData(data.error);
            }
            
        })
    })
    },[])
    return <h1>{data}</h1>
}

export default Purchase