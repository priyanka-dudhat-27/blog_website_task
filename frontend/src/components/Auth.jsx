/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { authActions } from '../store'; // Adjust the import path as needed

const Auth = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const endpoint=isSignUp ? "register" : "login";
  const sendRequest=async()=>{
    const res=await axios.post(`http://localhost:8001/api/v1/auth/${endpoint}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch((err)=>console.log(err))

    const data=await res.data;
    return data;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=>{
      console.log(data)
      localStorage.setItem('userId',data.data._id)
      localStorage.setItem('token',data.token)
      dispatch(authActions.Login())
      navigate("/")
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} boxShadow={'10px 10px 20px #ccc'} borderRadius={5} maxWidth={400} margin={'auto'} marginTop={5} padding={5}>
          <Typography variant='h3' padding={3} textAlign={'center'}>{isSignUp ? 'Sign Up' : 'Login'}</Typography>
          {isSignUp && <TextField type='text' name='name' onChange={handleChange} value={inputs.name} margin='normal' placeholder='Name' />}
          <TextField type='email' name='email' onChange={handleChange} value={inputs.email} margin='normal' placeholder='Email' />
          <TextField type='password' name='password' onChange={handleChange} value={inputs.password} margin='normal' placeholder='Password' />
          <Button type="submit" color='warning' sx={{ borderRadius: 3, marginTop: 3 }} variant='contained'>{isSignUp ? 'Sign Up' : 'Login'}</Button>
          <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ borderRadius: 3, marginTop: 3 }}>Change to {isSignUp ? 'Login' : 'Sign Up'}</Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
