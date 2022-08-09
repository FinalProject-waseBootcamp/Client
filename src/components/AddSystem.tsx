import React, { useRef } from "react";
import "./desigm.css";
import { post } from "../api/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { System as ISystem } from "../utils/modals";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

export default function AddSystem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISystem>();
  const name_ref = useRef("");
  const topic_ref = useRef("");
  const description_ref = useRef("");
  const communicationDetails_ref = useRef("");
  const createSystem = async () => {
    try {
      const systemToAdd = {
        uid: undefined,
        adminId: "from mobx",
        name: name_ref.current,
        topic: topic_ref.current,
        description: description_ref.current,
        communicationDetails: communicationDetails_ref.current,
      };
      const newSystem = await post(systemToAdd);
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
            {errors.topic?.type === "minLength" && <span>too short topic</span>}
            {errors.topic?.type === "maxLength" && <span>too long topiv</span>}
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
