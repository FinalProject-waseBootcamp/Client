import { useEffect, useState } from "react";
import { get } from "../api/user";
import { User as Iuser } from "../utils/modals";

export default function User() {
  const [users, setUsers] = useState<Iuser[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const users = (await get()) as Iuser[];
      setUsers(users);
      debugger;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!users?.length ? (
        <>no users</>
      ) : (
        users.map((user: Iuser) => (
          <div>
            <h1>Name:{user.firstName+" "+user.lastName}</h1>
            <h1> Email:{user.email}</h1>
          </div>
        ))
      )}
    </div>
  );
}
