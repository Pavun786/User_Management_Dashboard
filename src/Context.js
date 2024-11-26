import { useState, useContext, createContext ,useEffect} from "react";
import { API } from "./Global";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  
  
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch(`${API}/users`,{
         method:"GET",
        })
       .then((data)=>data.json())
       .then((mv)=>setUsers(mv))
       },[])

  return (
    <UserContext.Provider value={[users,setUsers]}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook
const useData = () => useContext(UserContext);

export { useData, UserProvider };