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
      const users = await get() as Iuser[];
      setUsers(users);
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
            <h2>Name:{user.firstName+" "+user.lastName}</h2>
            <h3> Email:{user.email}</h3>
          </div>
        ))
      )}
    </div>
  );
}
