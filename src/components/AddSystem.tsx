import React, { useRef } from "react";
import "./desigm.css";
import { post } from "../api/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { System as ISystem } from "../utils/modals";

import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { log } from "console";

const basic_url = new URL("http://localhost:3000/system/welcome");
export default function AddSystem() {
  debugger;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISystem>();
  const name_ref = useRef<HTMLInputElement>();
  const topic_ref = useRef<HTMLInputElement>();
  const description_ref = useRef<HTMLInputElement>();
  const communicationDetails_ref = useRef<HTMLInputElement>();
  const imgUrl_ref = useRef<HTMLInputElement>();

  const createSystem = async () => {
    try {
      const systemToAdd = {
        adminId: "from mobx",
        name: name_ref.current?.value || "",
        topic: topic_ref.current?.value || "",
        description: description_ref.current?.value || "",
        communicationDetails: communicationDetails_ref.current?.value || "",
        imgUrl: imgUrl_ref.current?.value || "",
      };
      
      debugger;
      const newSystem: ISystem = await post(systemToAdd);
      console.log(newSystem);
      
      // const newUrl=new URL(`${basic_url}?uid=${newSystem.uid}&name=${newSystem.name}`);
      const newUrl = new URL(`${basic_url}/${newSystem.uid}/${newSystem.name}`);
      alert("your new url for system is: " + newUrl);
      return newUrl;
      debugger;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>welcome</h2>
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
              {errors.name?.type === "minLength" && <span>too short name</span>}
              {errors.name?.type === "maxLength" && <span>too long name</span>}
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
                placeholder="imgUrl"
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
  );
}
