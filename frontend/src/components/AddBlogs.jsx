/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, InputLabel, TextField, Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const AddBlogs = () => {
  const token = localStorage.getItem('token');
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: null, 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setInputs({ ...inputs, image: e.target.files[0] }); 
  };

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', inputs.image);
    formData.append('upload_preset', 'instaclone'); 
    formData.append("folder", "posts");


    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/cantacloudy2/image/upload', formData);
      return res.data.url; 
    } catch (error) {
      console.error("Image upload failed: ", error);
      throw new Error("Image upload failed.");
      
    }
  };

  const sendRequest = async (imageUrl) => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/v1/blog/add',
        {
          title: inputs.title,
          description: inputs.description,
          image: imageUrl,
          user: localStorage.getItem('userId'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Blog post creation failed: ", error);
      setError("Failed to post the blog. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    setLoading(true);

    try {
      // First, upload the image to Cloudinary
      const imageUrl = await uploadImageToCloudinary();
      
      // Then, send the blog post data along with the uploaded image URL
      const data = await sendRequest(imageUrl);
      setSuccess("Blog posted successfully!");
      
      // Reset form
      setInputs({
        title: "",
        description: "",
        image: null,
      });
    } catch (error) {
      setError("An error occurred while posting the blog.");
    } finally {
      setLoading(false);
    }
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
          
          {/* Title Input */}
          <InputLabel sx={{ mb:1, mt:2, fontSize:'24px' }}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} />

          {/* Description Input */}
          <InputLabel sx={{ mb:1, mt:2, fontSize:'24px' }}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} />

          {/* Image Input */}
          <InputLabel sx={{ mb:1, mt:2, fontSize:'24px' }}>Image</InputLabel>
          <TextField type="file" name="image" onChange={handleImageChange} />

          {/* Submit Button */}
          <Button type="submit" sx={{mt:2,borderRadius:4}} variant='contained' color='warning' disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>

          {/* Error or Success Message */}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;
