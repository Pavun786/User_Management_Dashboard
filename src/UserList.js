import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import {API} from "./Global";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../src/App.css"
import ProfileList from "../src/assets/profile.webp"
import { useData } from "./Context";
import Pagination from "./Pagination";

export function UserList(){

   
    const [users,setUsers] = useData();
    const navigate = useNavigate()

    const [currentPage,setCurrentPage] = useState(1);
    const [recordPerPage] = useState(6);

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage
    const currentRecords = users.slice(indexOfFirstRecord,indexOfLastRecord)
    
    const nPages = Math.ceil(users.length/recordPerPage);
   
      console.log(users)
   
     const deleteFunction = (id)=>{
         
         
          if (window.confirm("Are you confirm to delete the user ?")) {
            
            let filterData = users.filter((ele)=> ele.id != id)
            setUsers(filterData)

          } 
          
      }
   
    return(

       <div className="userlist-container">
        <img src={ProfileList} className="userlist-img"/>
        <div className="table">
          <h2>User-List</h2>
          <TableContainer component={Paper} >
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User_Id</TableCell>
            <TableCell align="right">Name</TableCell>
            {/* <TableCell align="right">UserName</TableCell> */}
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Mobile</TableCell>
            
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRecords.map((ele,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ele.id}
              </TableCell>
              <TableCell align="right">{ele.name}</TableCell>
              {/* <TableCell align="right">{ele.username}</TableCell> */}
              <TableCell align="right">{ele.email}</TableCell>
              <TableCell align="right">{ele.phone}</TableCell>
             
              <TableCell align="right">
                <button className="edit-btn" onClick={()=>navigate(`/edit/${ele.id}`)}>Edit</button>
                <button className="del-btn" onClick={()=>deleteFunction(ele.id)}>Delete</button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    <Pagination 
         nPages = {nPages}
         currentPage ={currentPage}
         setCurrentPage ={setCurrentPage}
        />
    </div>
       
        </div>
    )
}