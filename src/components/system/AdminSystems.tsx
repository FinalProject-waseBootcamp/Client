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
import { constants } from "fs";

export default function MySystems() {
  debugger;
  const [mySystems, setMySystems] = useState<System[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSystems();
  }, []);

  const deleteSystem = async (uid: string) => {
    debugger;
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this system!",
        icon: "warning",
        buttons: ["Cancel", "Ok"],
        dangerMode: true,
      }).then(async (willDelete) => {
        debugger;
        if (willDelete) {
          debugger;
          const res = await axios.delete(`http://localhost:3333/system/${uid}`);
          debugger;
          const status = await res.status;
          debugger;
          if (status === 200) {
            debugger;
            swal("Poof! Your business has been deleted!", {
              icon: "success",
            });
            getSystems();
          }
        } else {
          debugger;
          swal("Your business is safe!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get uid manager from mobix
  const managerId = "from mobx";

  const getSystems = async () => {
    try {
      debugger;
      const res = await axios.get(`http://localhost:3333/system/${managerId}`);
      const _mySystems: System[] = await res.data;
      setMySystems(_mySystems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="allMyBusiness">
      <Typography
        gutterBottom
        variant="h2"
        component="div"
        sx={{ textAlign: "center", padding: "10px" }}
      >
        systems of admin with id [{managerId}]
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
                  {system.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {system.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {system.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={() => navigate("/editSystem")}>
                  Edit system settings
                </Button>
                <Button
                  size="medium"
                  onClick={() => {
                    debugger;
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
  );
}
