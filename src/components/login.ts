import { ReactElement, useEffect, useState } from "react";
import { get } from '../api/user';
export default function User() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, [])
    const getAllUsers = async () => {
        try {
            const res= await get();
            // setUsers(res.data);
            debugger
        } catch (err) {
            console.log(err)
        }
    };
   
    //   return <div> 😍LOVE </div>
    
        // 

        // {users && users.map(user =>
        //                 <div >
        //                   <h1>Name:{user.userName}</h1>
        //                   <h1> Password:{user.password}</h1>
        //                     </div>
        //             )}
       
    
}