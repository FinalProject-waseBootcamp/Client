import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function Request() {
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
          <div style={{border: "1px solid #4c6a92", borderRadius: "5px",margin:"2vh"}}>
            <h6>these fields will not be shown to anyOne besides you</h6>
            <nav style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                label="first name"
                id="outlined-size-small"
                size="small"
              />
              <TextField
                label="last name"
                id="outlined-size-small"
                size="small"
              />
            </nav>
          </div>
          <div style={{border: "1px solid #4c6a92", borderRadius: "5px",margin:"2vh"}}>
            <TextField label="email" id="outlined-size-small" size="small" />
            <TextField label="phone" id="outlined-size-small" size="small" />
            <TextField
              label="display name"
              id="outlined-size-small"
              size="small"
            />
            <TextField label="notes" id="outlined-size-small" size="small" />
          </div>
        </div>
        <Button>Save</Button>
      </Box>
    </>
  );
}
