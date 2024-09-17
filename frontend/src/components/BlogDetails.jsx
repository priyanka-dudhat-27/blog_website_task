/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';

const BlogDetails = () => {
  const { id } = useParams(); // Assuming the blog ID is passed via URL params
  const userId = localStorage.getItem('userId');
  const [inputs, setInputs] = useState({
   
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const sendRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:8001/api/v1/blog/getByUserId/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setInputs({
        title: data.blogs.title,
        description: data.blogs.description,
        image: data.blogs.image
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8001/api/v1/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor={'#ccc'} // Use solid color for border
        borderRadius={10}
        boxShadow={'10px 10px 20px #ccc'}
        padding={3}
        margin={'auto'}
        display={'flex'}
        width={'80%'}
        flexDirection={'column'}
        mt={3}

      >
        <Typography variant='h4' textAlign={'center'} color={'grey'} fontWeight={'bold'}>
          Update Your Blog
        </Typography>
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Title</InputLabel>
        <TextField name="title" onChange={handleChange} value={inputs.title} />
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>Description</InputLabel>
        <TextField name="description" onChange={handleChange} value={inputs.description} />
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px' }}>ImageUrl</InputLabel>
        <TextField name="image" onChange={handleChange} value={inputs.image} />
        <Button type="submit" sx={{ mt: 2, borderRadius: 4 }} variant='contained' color='warning'>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default BlogDetails;
