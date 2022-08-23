import React, { useRef } from "react";
import axios from "axios";
import { System } from "../../utils/modals";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { System as ISystem } from "../../utils/modals";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Header from "../Header";

interface Ilocation {
  uid: string;
}

export default function EditSystem() {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state as Ilocation;
  const uid = from.uid;
  const [currentSystem, setCurrentSystem] = React.useState<System>();

  const name_ref = useRef<HTMLInputElement>();
  const topic_ref = useRef<HTMLInputElement>();
  const description_ref = useRef<HTMLInputElement>();
  const communicationDetails_ref = useRef<HTMLInputElement>();
  const imgUrl_ref = useRef<HTMLInputElement>();

  const getCurrentSystem = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/system/${uid}`);
      return response.data as System;
    } catch (err) {
      console.log(err);
    }
  };

  const updateSystem = async () => {

    try {
      const updatedSystem:System = {
        _id: uid,
        adminId: currentSystem?.adminId||'',
        name: name_ref.current?.value||'',
        topic: topic_ref.current?.value||'',
        description: description_ref?.current?.value||'',
        communicationDetails: communicationDetails_ref?.current?.value||'',
        imgUrl : imgUrl_ref.current?.value || '',
        siteUrl:currentSystem?.siteUrl||''
      }

      swal({
        title: "sure?",
        icon: "warning",
        buttons: ["Cancel", "Ok"],
        dangerMode: true,
      }).then(async (willUpdate) => {
        if (willUpdate) {
          const res = await axios.put(`http://localhost:3333/system/${uid}`,updatedSystem);
          const status = await res.status;
          if (status === 200) {
            swal("Your system details has been updated!", {
              icon: "success",
            });
            // setCurrentSystem(res.data);
            navigate('/adminSystems')
            // return res.data as System;
          }
        } else {
          swal("Your system is safe!");
        }
      })
    } catch (err) {
        alert(err);
    }
  }
  

  React.useEffect(() => {
    async function setSystem() {
      const system = await getCurrentSystem();
      setCurrentSystem(system);
    }
    setSystem();
  }, [uid]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISystem>();

  return (
    <div>
     <Header />

      {currentSystem && (
        <>
          <h2>edit {currentSystem.name} system</h2>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            // noValidate
            autoComplete="on"
            onSubmit={handleSubmit(updateSystem)}
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
                    defaultValue={currentSystem.name}
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
                    defaultValue={currentSystem.topic}
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
                    defaultValue={currentSystem.description}
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
                    defaultValue={currentSystem.communicationDetails}
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
                    defaultValue={currentSystem.imgUrl}
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
    </div>
  );
}
