import "./App.css";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { UserList } from "./UserList";
import EditUser from "./EditUser";
import AddUser from "./addUser";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <h3>User_Dashboard</h3>
          <h3 onClick={() => navigate("/add-user")} className="add-user">
            Add-User
          </h3>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
