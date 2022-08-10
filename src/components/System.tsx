import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParams } from "react-router";
export default function System() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const systemName=searchParams.get('name');
  const { uid,name} = useParams();
    
  return (
    <>
    <h1>hellow to {name} system</h1>
    </>
  );
}
