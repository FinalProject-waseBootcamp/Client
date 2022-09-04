import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { System } from "../../utils/modals";
import Stack from "@mui/material/Stack";
import swal from "sweetalert";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import userStore from "../../store/userStore";
import systemStore from "../../store/systemStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../Header";
import { getByAdminId } from '../../api/system'
import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminSystems() {
  let auth = getAuth();
  const [mySystems, setMySystems] = useState<System[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const [adminId, setAdminId] = useState(user?.uid);

  const navigate = useNavigate();

  useEffect(() => {
    debugger
    userStore.setUser(user);
    setAdminId(user?.uid);
    getSystems();
    auth = getAuth();
    getSystems();
  }, []);

  useEffect(() => {
    debugger
    if (loading) {
      return;
    }
    if (user) {
      setAdminId(user?.uid);
    }
  }, [userStore.user])

  useEffect(() => { 
    getSystems();
    setMySystems(systemStore.systems);    
  }, [adminId])


  const deleteSystem = async (uid: string) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this system!",
        icon: "warning",
        buttons: ["Cancel", "Ok"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const res = await axios.delete(`http://localhost:3333/system/${uid}`);
          const status = await res.status;
          if (status === 200) {
            swal("Poof! Your business has been deleted!", {
              icon: "success",
            });
            systemStore.loadSystems();
          }
        } else {
          swal("Your business is safe!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSystems = async () => {
    try {
      debugger
      const res = await getByAdminId(adminId);
      const _mySystems: System[] = res;
      debugger
      setMySystems(_mySystems);
      console.log(_mySystems[0]);
    } catch (error) {
      debugger;
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <div id="allMyBusiness">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ textAlign: "center", padding: "10px" }}
        >
          systems of {userStore.user?.displayName}
        </Typography>
        <Stack
          padding={3}
          direction="row"
          spacing={5}
          sx={{ "& .MuiCard-root": { m: 5 }, flexWrap: "wrap" }}
        >
          <Button
            variant="contained"
            id="leftTopButton"
            onClick={() => navigate("/addSystem")}
          >
            add system
          </Button>
          {mySystems?.length > 0 &&
            mySystems.map((system: System) => (
              <Card key={system._id}>
                <CardMedia
                  component="img"
                  alt="system"
                  height="140"
                  image={system.imgUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {system.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    topic: {system.topic}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    description: {system.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    to the{" "}
                    <a href={system.siteUrl} target="_blank">
                      site
                    </a>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() =>
                      navigate("/editSystem", { state: { uid: system._id } })
                    }
                  >
                    Edit system settings
                  </Button>
                  <Button
                    size="medium"
                    onClick={() => {
                      console.log(system._id);
                      deleteSystem(system._id || "");
                    }}
                  >
                    Delete this system
                  </Button>
                </CardActions>
              </Card>
            ))}
        </Stack>
      </div>
    </>
  );
}
