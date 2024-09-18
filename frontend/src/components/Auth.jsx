/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store'; // Adjust the import path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const Auth = () => {
  const BASE_URL = import.meta.env.BASE_URL

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const endpoint = isSignUp ? "register" : "login";

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/${endpoint}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      });
      return res.data;
    } catch (err) {
      toast.error(err.message);
      throw err; // Re-throw the error to be caught in handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();
      localStorage.setItem('userId', data.data._id);
      localStorage.setItem('token', data.token);
      dispatch(authActions.Login());
      toast.success('Successfully logged in!');
      navigate("/");
    } catch (err) {
      // Error handling is already done in sendRequest
    }
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
      <ToastContainer /> {/* Toast Container for notifications */}
    </div>
  );
};

export default Auth;
