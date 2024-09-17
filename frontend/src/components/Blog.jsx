/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, CardHeader, CardMedia, Avatar, CardContent, Typography, IconButton, Box } from '@mui/material';
import { ModeEditOutlined as ModeEditOutlinedIcon, DeleteForever as DeleteForeverIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; // Import date-fns for date formatting

const Blog = ({ title, description, image, user, isUser, id, createdAt }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      const res = await axios.delete(`http://localhost:8001/api/v1/blog/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    deleteRequest().then((data) => console.log(data));
  };

  // Format the created date
  const formattedDate = format(new Date(createdAt), 'MMMM dd, yyyy');

  return (
    <Card
      sx={{
        width: '40%',
        margin: 'auto',
        mt: 3,
        boxShadow: '5px 5px 10px #ccc',
        '&:hover': { boxShadow: "10px 10px 20px #ccc" },
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
        subheader={formattedDate} // Display the formatted date
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
