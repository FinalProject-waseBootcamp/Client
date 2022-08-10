import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function System() {
    const [searchParams, setSearchParams] = useSearchParams();
    const systemName=searchParams.get('name');
  return (
    <>
    <h1>hellow to {systemName} system</h1>
    </>
  );
}
