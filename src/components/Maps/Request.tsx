import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, TextareaAutosize } from "@mui/material";
import { useRef } from "react";
import { Request, Status } from "../../utils/modals";
import axios from "axios";
import systemStore from "../../store/systemStore";
import { useForm } from "react-hook-form";

export default function Requests() {
  const firstName_ref = useRef<HTMLInputElement>();
  const lastName_ref = useRef<HTMLInputElement>();
  const email_ref = useRef<HTMLInputElement>();
  const phone_ref = useRef<HTMLInputElement>();
  const displayName_ref = useRef<HTMLInputElement>();
  const notes_ref = useRef<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>();

  const handleSave = async () => {
    debugger;
    const newRequest: Request = {
      firstName: firstName_ref.current?.value || "",
      lastName: lastName_ref.current?.value || "",
      email: email_ref.current?.value || "",
      phone: phone_ref.current?.value || "",
      system_id: {...systemStore.currentSystem}._id,
      display_name: displayName_ref.current?.value || "",
      status: Status.SENT,
      notes: notes_ref.current?.value || "",
    };
    try {
      debugger;
      await axios.post("http://localhost:3333/request", newRequest);
      debugger;
    } catch (e) {
      debugger;
      console.log(e);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h4>Fill your Details for add Location Request</h4>
          <div
            style={{
              border: "1px solid #4c6a92",
              borderRadius: "5px",
              margin: "2vh",
            }}
          >
            <h6>these fields will not be shown to anyOne besides you</h6>
            <nav style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="first name"
                id="outlined-size-small"
                size="small"
                inputRef={firstName_ref}
                {...register("firstName", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              />
              {errors.firstName?.type === "minLength" && (
                <span>too short firstName</span>
              )}
              {errors.firstName?.type === "maxLength" && (
                <span>too long firstName</span>
              )}
              {errors.firstName?.type === "required" && <span>required</span>}
              <TextField
                label="last name"
                id="outlined-size-small"
                size="small"
                inputRef={lastName_ref}
                {...register("lastName", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              />
              {errors.lastName?.type === "minLength" && (
                <span>too short lastName</span>
              )}
              {errors.lastName?.type === "maxLength" && (
                <span>too long lastName</span>
              )}
              {errors.lastName?.type === "required" && <span>required</span>}
            </nav>
          </div>
          <div
            style={{
              border: "1px solid #4c6a92",
              borderRadius: "5px",
              margin: "2vh",
            }}
          >
            <TextField
              label="email"
              id="outlined-size-small"
              size="small"
              inputRef={email_ref}
              {...register("email", {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
            {errors.email?.type === "minLength" && (
              <span>too short address</span>
            )}
            {errors.email?.type === "maxLength" && (
              <span>too long address</span>
            )}
            {errors.email?.type === "required" && <span>required</span>}
            <TextField
              label="phone"
              id="outlined-size-small"
              size="small"
              inputRef={phone_ref}
              {...register("phone", {
                required: true,
                minLength: 9,
                maxLength: 20,
              })}
            />
            {errors.phone?.type === "minLength" && (
              <span>too short number</span>
            )}
            {errors.phone?.type === "maxLength" && <span>too long number</span>}
            {errors.phone?.type === "required" && <span>required</span>}
            <TextField
              label="display name"
              id="outlined-size-small"
              size="small"
              inputRef={displayName_ref}
              {...register("display_name", {
                required: true,
                minLength: 2,
                maxLength: 20,
              })}
            />
            {errors.display_name?.type === "minLength" && (
              <span>too short name</span>
            )}
            {errors.display_name?.type === "maxLength" && (
              <span>too long name</span>
            )}
            {errors.display_name?.type === "required" && <span>required</span>}
            <TextareaAutosize
              placeholder="notes"
              id="outlined-size-small"
              {...register("notes", {
                maxLength: 100,
              })}
              ref={notes_ref}
            />
            {errors.notes?.type === "maxLength" && <span>too long</span>}
          </div>
        </div>
        <Button onClick={handleSubmit(handleSave)}>Save</Button>
      </Box>
    </>
  );
}
