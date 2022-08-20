import React from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { System } from "../../utils/modals";
import { useLocation } from "react-router-dom";

interface Ilocation{
    uid:string;
}

export default function EditSystem() {
    const location=useLocation();
    const from=location.state as Ilocation;
    const uid=from.uid;
    const [currentSystem, setCurrentSystem] = React.useState<System>();
  
    const getCurrentSystem = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/system/${uid}`);
        setCurrentSystem(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    React.useEffect(() => {
      getCurrentSystem();
    }, []);

    return (
        <div>
            <h3>edit {currentSystem?.name} system</h3>
        </div>
    )
}