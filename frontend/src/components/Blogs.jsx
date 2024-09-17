/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import axios from 'axios'

const Blogs = () => {
  const [blogs,setBlogs]=useState([])

  const sendRequest=async()=>{
    const res=await axios.get("http://localhost:8001/api/v1/blog/getAllblogs").catch((err)=>console.log(err))

    const data=await res.data;
    return data;
  }

  useEffect(()=>{
    const userId = localStorage.getItem('userId');
    sendRequest().then((data)=>setBlogs(data.blogData))
  },[])

  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <Blog  key={index} id={blog.id} {...blog} />
      ))}
    </div>
  )
}

export default Blogs