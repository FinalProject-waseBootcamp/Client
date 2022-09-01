import React, { useRef, useState } from "react";
import "../../style/design.css";
import { postSystem } from "../../api/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Manager, Roles, System as ISystem } from "../../utils/modals";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {put}  from "../../api/system";
import systemStore from "../../store/systemStore";
import userStore from "../../store/userStore";
import { getAuth } from "firebase/auth";
import Header from "../Header";
import ManagerStore from "../../store/mangersStore";
import { postManager } from "../../api/managers";

const basic_url = "http://localhost:3000/system/welcome";

export default function AddSystem() {
  const auth = getAuth();
  const user = auth.currentUser;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISystem>();
  const navigate = useNavigate();
  const name_ref = useRef<HTMLInputElement>();
  const topic_ref = useRef<HTMLInputElement>();
  const description_ref = useRef<HTMLInputElement>();
  const communicationDetails_ref = useRef<HTMLInputElement>();
  const imgUrl_ref = useRef<HTMLInputElement>();
  const [adminSystemsMount, setMount] = useState(0);

  const createSystem = async () => {
    debugger;
    try {
      const systemToAdd = {
        adminId: user?.uid || "",
        name: name_ref.current?.value || "",
        topic: topic_ref.current?.value || "",
        description: description_ref.current?.value || "",
        communicationDetails: communicationDetails_ref.current?.value || "",
        imgUrl: imgUrl_ref.current?.value || "",
        siteUrl: basic_url,
      };
      const newSystem: ISystem = await postSystem(systemToAdd);
      const uid = newSystem._id || "";
      console.log("new system created: ", newSystem);
      const newUrl = `${basic_url}/${newSystem.name}/${newSystem._id}`;
      const updatedSystem = {
        ...newSystem,
        siteUrl: newUrl,
      };

      systemStore.addSystem(updatedSystem);
        const manager: any = {
            "user_id": userStore.user._id,
            "system_id":uid,
            "active": true,
            "display_name": newSystem.name,
            "role":Roles.ADMIN ,
            "invitation_sent": "?"
        }
        // const newManager: Manager = await postManager(manager);
        await ManagerStore.addManager(manager);
      try {
        await put(uid,updatedSystem);
      } catch (err) {
        console.log(err);
      }
      swal("your new url for system is: " + newUrl).then(() =>
        window.open(newUrl, "_blank")
      );
      navigate('/adminSystems')
      return newUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <h2>welcome</h2>
      <Button
        variant="contained"
        id="leftTopButton"
        onClick={() => navigate("/adminSystems")}
      >
        My systems
      </Button>
      {adminSystemsMount > 4 ? (
        <p>You own too many systems. you can delete one for creating another</p>
      ) : (
        <>
          <h4>enter details for new system</h4>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit(createSystem)}
          >
            <nav className="newSystemInput">
              <div>
                <h5 className="newSystemTitle">NAME</h5>
                <h5 className="newSystemTitle">TOPIC</h5>
                <h5 className="newSystemTitle">DESCRIPTION</h5>
                <h5 className="newSystemTitle">COMMUNICATION</h5>
                <h5 className="newSystemTitle">SYSTEM IMAGE</h5>
              </div>
              <div>
                <div>
                  <TextField
                    required
                    id="standard-required"
                    variant="filled"
                    label=" "
                    placeholder="system name"
                    inputRef={name_ref}
                    {...register("name", {
                      required: true,
                      minLength: 2,
                      maxLength: 20,
                    })}
                  />
                  {errors.name?.type === "minLength" && (
                    <span>too short name</span>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <span>too long name</span>
                  )}
                  {errors.name?.type === "required" && <span>required</span>}
                </div>
                <div>
                  <TextField
                    required
                    id="standard-required"
                    variant="filled"
                    label=" "
                    placeholder="system topic"
                    inputRef={topic_ref}
                    {...register("topic", {
                      required: true,
                      minLength: 2,
                      maxLength: 20,
                    })}
                  />
                  {errors.topic?.type === "minLength" && (
                    <span>too short topic</span>
                  )}
                  {errors.topic?.type === "maxLength" && (
                    <span>too long topiv</span>
                  )}
                  {errors.topic?.type === "required" && <span>required</span>}
                </div>
                <div>
                  <TextField
                    id="standard-required"
                    variant="filled"
                    placeholder="system description"
                    inputRef={description_ref}
                    {...register("description", {
                      maxLength: 30,
                    })}
                  />
                  {errors.description?.type === "maxLength" && (
                    <span>too long description</span>
                  )}
                </div>
                <div>
                  <TextField
                    required
                    id="standard-required"
                    variant="filled"
                    label=" "
                    placeholder="communication details"
                    inputRef={communicationDetails_ref}
                    {...register("communicationDetails", {
                      required: true,
                      minLength: 10,
                      maxLength: 30,
                    })}
                  />
                  {errors.communicationDetails?.type === "minLength" && (
                    <span>too short</span>
                  )}
                  {errors.communicationDetails?.type === "maxLength" && (
                    <span>too long</span>
                  )}
                  {errors.communicationDetails?.type === "required" && (
                    <span>required</span>
                  )}
                </div>
                <div>
                  <TextField
                    placeholder="image Url"
                    inputRef={imgUrl_ref}
                    id="standard-required"
                    variant="filled"
                  />
                </div>
              </div>
            </nav>
            <div>
              <>marked with * are required</>
            </div>
            <Button type="submit" className="btn btn-primary">
              Save
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
