import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { API } from "./Global";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useData } from "./Context";

function EditUser() {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState("");
  const [users,setUsers] = useData();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    // const data = await fetch(`${API}/users/${id}`, {
    //   method: "GET",
    // });
    // const res = await data.json();

    const res = users.filter((ele)=> ele.id == id)

    console.log("resss",res)

    setSingleUser(res);
  };

  return (
    <div className="register">
      {!singleUser ? (
        <h2>Loading...</h2>
      ) : (
        <UserEditForm user={singleUser} setUser={setSingleUser} />
      )}
    </div>
  );
}

const UpdateValidationSchema = yup.object({
  Id: yup.number().required(),
  Name: yup.string().required(),
  Email: yup.string().required(),
  Mobile: yup.string().required(),
});

function UserEditForm({ user }) {

  const [users,setUsers] = useData();  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Id: user[0].id,
      Name: user[0].name,
      Email: user[0].email,
      Mobile: user[0].phone,
    },

    validationSchema: UpdateValidationSchema,

    onSubmit: async (values) => {
        let updateData = {
          id: values.Id,
          name: values.Name,
          email: values.Email,
          phone: values.Mobile,
        };
      
        const index = users.findIndex((ur) => ur.id == user[0].id);
      
        if (index !== -1) {
          users.splice(index, 1, { ...users[index], ...updateData });
          setUsers([...users]); 
          alert("User Edited Successfully.");
          navigate("/");
        } else {
          console.error("User not found");
        }
      },
      
  });

  return (
    <div>
      <h3 className="register">Edit User-Form</h3>
      <form className="register-container" onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Id"
          variant="outlined"
          value={formik.values.Id}
          onChange={formik.handleChange}
          name="Id"
          onBlur={formik.handleBlur}
          error={formik.touched.Id && formik.errors.Id}
          helperText={
            formik.touched.Id && formik.errors.Id ? formik.errors.Id : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={formik.values.Name}
          onChange={formik.handleChange}
          name="Name"
          onBlur={formik.handleBlur}
          error={formik.touched.Name && formik.errors.Name}
          helperText={
            formik.touched.Name && formik.errors.Name
              ? formik.errors.Name
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={formik.values.Email}
          onChange={formik.handleChange}
          name="Email"
          onBlur={formik.handleBlur}
          error={formik.touched.Email && formik.errors.Email}
          helperText={
            formik.touched.Email && formik.errors.Email
              ? formik.errors.Email
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Mobile"
          variant="outlined"
          value={formik.values.Mobile}
          onChange={formik.handleChange}
          name="Mobile"
          onBlur={formik.handleBlur}
          error={formik.touched.Mobile && formik.errors.Mobile}
          helperText={
            formik.touched.Mobile && formik.errors.Mobile
              ? formik.errors.Mobile
              : null
          }
        />

        <Button type="submit" variant="contained">
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditUser;
