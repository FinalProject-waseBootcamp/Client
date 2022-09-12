import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, TextareaAutosize } from "@mui/material";
import { useRef } from "react";
import { Request, Status } from "../../utils/modals";
import axios from "axios";
import systemStore from "../../store/systemStore";
import { useForm } from "react-hook-form";
// import { Textarea } from "evergreen-ui";
import { post } from "../../api/request";
import swal from "sweetalert";

export default function Requests() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Request>({
    mode: "onChange",
  });
  const registerOptions = {
    firstName: {
      required: " First Name is required",
      minLength: {
        value: 2,
        message: "too short First Name",
      },
      maxLength: {
        value: 10,
        message: "too long First Name",
      },
    },
    lastName: {
      required: "Last Name is required",
      minLength: {
        value: 2,
        message: "too short Last Name",
      },
      maxLength: {
        value: 10,
        message: "too long Last Name",
      },
    },
    general: {
      required: " required",
      minLength: {
        value: 2,
        message: "too short",
      },
      maxLength: {
        value: 20,
        message: "too long",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/,
        message: "Email is not valid",
      },
    },
    phone: {
      required: "Phone is required",
      minLength: {
        value: 9,
        message: "too short phone number",
      },
      maxLength: {
        value: 20,
        message: "too long phone number",
      },
    },
    description: {
      required: "Description is required",
      maxLength: {
        value: 30,
        message: "Description is too long",
      },
    },
    notes: {
      maxLength: {
        message: "Too long",
        value: 50,
      },
    },
    building: {
      required:"required"
    },
  };
  const onSubmit = async (data: any) => {
    const newRequest: Request = {
      ...data,
      system_id: { ...systemStore.currentSystem }._id,
      status: Status.SENT,
    };
    alert(JSON.stringify(newRequest));
    try {
      await post(newRequest);
      swal("SAVED", "success ","success");
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4>Fill your Details for adding Location Request</h4>
        <div
          style={{
            border: "1px solid #4c6a92",
            borderRadius: "5px",
            margin: "2vh",
          }}
        >
          <h5>Personal Details</h5>
          these fields will not be shown to customers
          <nav style={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label="first name"
              id="outlined-size-small"
              size="small"
              {...register("firstName", registerOptions.firstName)}
            />
            <small>{errors.firstName && errors.firstName.message}</small>

            <TextField
              label="last name"
              id="outlined-size-small"
              size="small"
              {...register("lastName", registerOptions.lastName)}
            />
            <small>{errors.lastName && errors.lastName.message}</small>
          </nav>
        </div>
        <div
          style={{
            border: "1px solid #4c6a92",
            borderRadius: "5px",
            margin: "2vh",
          }}
        >
          <nav>
            <TextField
              label="display name"
              id="outlined-size-small"
              size="small"
              {...register("display_name", registerOptions.general)}
            />
            <small>{errors.display_name && errors.display_name.message}</small>
          </nav>
          <nav>
            <TextField
              label="email"
              id="outlined-size-small"
              size="small"
              {...register("email", registerOptions.email)}
            />
            <small>{errors.email && errors.email.message}</small>
            <TextField
              label="phone"
              id="outlined-size-small"
              size="small"
              {...register("phone", registerOptions.phone)}
            />
            <small>{errors.phone && errors.phone.message}</small>
          </nav>
          <nav style={{ display:"flex",flexDirection: "row",flexWrap:"nowrap"}}>
            <h6>Describe your object</h6>
            <TextField
              label="description"
              id="outlined-size-small"
              size="small"
              {...register("description", registerOptions.description)}
            />
            <small>{errors.description && errors.description.message}</small>
            {/* <Textarea
              style={{
                resize: "none",
                width: "25%",
                margin: "5px",
              }}
              placeholder="notes for customers"
              id="outlined-size-small"
              {...register("notesForDiaplay", registerOptions.notes)}
            /> */}
            <small>
              {errors.notesForDiaplay && errors.notesForDiaplay.message}
            </small>
          </nav>

          <nav style={{ display:"flex",flexDirection: "row",flexWrap:"nowrap"}}>
            <h5>Location</h5>
            <TextField
              label="land"
              id="outlined-size-small"
              size="small"
              {...register("markerAddress.land", registerOptions.general)}
            />
            <small>{errors.markerAddress && errors.markerAddress.message}</small>
            <TextField
              label="city"
              id="outlined-size-small"
              size="small"
              {...register("markerAddress.city", registerOptions.general)}
            />
            <small>{errors.markerAddress && errors.markerAddress.message}</small>
            <TextField
              label="street"
              id="outlined-size-small"
              size="small"
              {...register("markerAddress.street", registerOptions.general)}
            />
            <small>{errors.markerAddress && errors.markerAddress.message}</small>
            <TextField
              label="building"
              id="outlined-size-small"
              size="small"
              {...register("markerAddress.building", registerOptions.building)}
            />
            <small>{errors.markerAddress && errors.markerAddress.message}</small>
          </nav>
        </div>
        <Button type="submit">save</Button>
      </Box>
    </>
  );
}
