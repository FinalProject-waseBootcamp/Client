import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParams } from "react-router";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
export default function System() {
  const { name,uid} = useParams();
    const navigate= useNavigate();
  return (
    <>
    <h1>hellow to {name} system</h1>
    <Button variant="contained" onClick={()=>navigate('/mySystem')} >My system</Button>
    </>
  );
}
