/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardMedia, Avatar, CardContent, Typography, IconButton, Box } from '@mui/material';
import { ModeEditOutlined as ModeEditOutlinedIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, description, image, user, isUser,id }) => {
  const navigate=useNavigate()
  const handleEdit=()=>{
    navigate(`/blogs/${id}`)
  }

  const deleteRequest=async()=>{
    const res=await axios.delete(`http://localhost:8001/api/v1/blog/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    }).catch((err)=>console.log(err))
    const data=await res.data;
    return data
  }
  const handleDelete=()=>{
    deleteRequest().then((data)=>console.log(data))
  }
  return (
    <Card 
      sx={{ 
        width: '40%', 
        margin: 'auto', 
        mt: 3, 
        boxShadow: '5px 5px 10px #ccc', 
        '&:hover': { boxShadow: "10px 10px 20px #ccc" } 
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="user">
            {user.name[0]}
          </Avatar>
        }
        action={
          isUser && (
            <Box>
              <IconButton aria-label="edit" onClick={handleEdit}>
                <ModeEditOutlinedIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          )
        }
        title={title}
        subheader="September 14, 2016" // You might want to replace this with a dynamic date
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ objectFit: 'contain' }}
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
