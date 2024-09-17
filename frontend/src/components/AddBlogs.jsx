/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import axios from 'axios'

const AddBlogs = () => {
  const token=localStorage.getItem('token');
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const sendRequest=async()=>{
    const res=await axios.post("http://localhost:8001/api/v1/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:localStorage.getItem('userId')
    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).catch((err)=>console.log(err))

    console.log(res)

    const data=await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=>console.log(data))
    setInputs({
      title: "",
      description: "",
      image: ""
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          border={3} 
          borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(88,9,121,0.8436624649859944) 35%, rgba(0,212,255,1) 100%)" 
          borderRadius={10} 
          boxShadow={'10px 10px 20px #ccc'} 
          padding={3} 
          margin={'auto'} 
          display={'flex'} 
          width={'80%'} 
          flexDirection={'column'} 
          mt={3}
        >
          <Typography variant='h4' textAlign={'center'} color={'grey'} fontWeight={'bold'}>Post Your Blog</Typography>
          <InputLabel sx={{ mb:1, mt:2, fontSize:'24px' }}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} />
          <InputLabel sx={{ mb:1, mt:2, fontSize:'24px' }}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} />
          <InputLabel sx={{ mb:1, mt:2, fontSize:'24px' }}>ImageUrl</InputLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} />
          <Button type="submit" sx={{mt:2,borderRadius:4}} variant='contained' color='warning' >Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;
