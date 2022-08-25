import Directions from "@mui/icons-material/Directions";
import { Paper, IconButton, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import AutoComplete from "./AutoComplete";
import Menu from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const AddLocation: React.FC = (props: any) => {
  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 500,
        }}
      >
        {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
          <Menu />
        </IconButton> */}

        <AutoComplete/>

        {/* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <Directions />
        </IconButton> */}
      </Paper>
    </div>
  );
};
export default AddLocation;
