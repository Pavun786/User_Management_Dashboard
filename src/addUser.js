import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { useNavigate,Link} from "react-router-dom";
import * as yup from "yup";
import {API} from "./Global";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useData } from './Context';


const UpdateValidationSchema = yup.object({
    Id : yup.number().required(),
    Name:yup.string().required(),
    Email:yup.string().required(),
    Mobile:yup.number().required(),
});

   function AddUser(){
    
    const navigate = useNavigate();

    const [users,setUsers] = useData();
   
     const formik = useFormik({

        initialValues:{
            Id :"",
            Name:"",
            Email : "",
            Mobile :"",
           
        },
   
        validationSchema: UpdateValidationSchema,

       onSubmit:async (values)=>{
        console.log("val",values)
       
       let newData = {
          "id" : values.Id,
          "name" : values.Name,
          "email" : values.Email,
          "phone" : values.Mobile
       }

       if(users.some((ele)=> ele.id == values.Id)){
         alert("The UserId already Exists ❗❗")
       }else{
        setUsers([...users,newData])
        alert("User Added Successfully ✔✔")
        navigate("/");
       }

      
       
        // const data = await fetch(`${API}/users`,{
        //     method:"POST",
        //     body:JSON.stringify(newData),
        //     headers:{"Content-type": "application/json"},
      
        //    })
        //    if (data.status === 500) {
        //     alert(data.message);
          
        //   } else
        //    { 
        //     const result=await data.json() 
        //     alert("User Added Successfully..")
        //     navigate("/users");
        //    }
       }
    });
     
    return(
        <div >
            <h3 className='register'>Add User-Form</h3>
            <form className='register-container'onSubmit={formik.handleSubmit}>

            <TextField id="outlined-basic" 
           label="Id" 
           variant="outlined"
           value={formik.values.Id}
            onChange={formik.handleChange}
            name="Id" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Id && formik.errors.Id}
            helperText={formik.touched.Id && formik.errors.Id ? formik.errors.Id : null}/>

       <TextField id="outlined-basic" 
          label="Name" 
          variant="outlined" 
          value={formik.values.Name}
            onChange={formik.handleChange}
            name="Name"
            onBlur={formik.handleBlur} 
           
            error={formik.touched.Name && formik.errors.Name}
            helperText={formik.touched.Name && formik.errors.Name ? formik.errors.Name : null}/>


        <TextField id="outlined-basic" 
          label="Email" 
          variant="outlined"
          value={formik.values.Email}
            onChange={formik.handleChange}
            name="Email" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Email && formik.errors.Email}
            helperText={formik.touched.Email && formik.errors.Email ? formik.errors.Email : null}/>

      

      
     <TextField id="outlined-basic" 
          label="Mobile" 
          variant="outlined"
          value={formik.values.Mobile}
            onChange={formik.handleChange}
            name="Mobile" 
            onBlur={formik.handleBlur} 
            error={formik.touched.Mobile && formik.errors.Mobile}
            helperText={formik.touched.Mobile && formik.errors.Mobile ? formik.errors.Mobile : null}/>


          

          <Button type="submit" variant="contained">Create</Button>
          
        
     
          </form>
        </div>
    )
 }
 

 export default AddUser;
