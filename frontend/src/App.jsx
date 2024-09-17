/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Blogs from './components/Blogs'
import UserBlogs from './components/UserBlogs'
import BlogDetails from './components/BlogDetails'
import AddBlogs from './components/AddBlogs'
import { useSelector } from 'react-redux'

const App = () => {
  const isLoggedIn =useSelector(state=>state.isLoggedIn)
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<Blogs />} />
          <Route path='/userblogs' element={<UserBlogs />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
          <Route path='/addblogs' element={<AddBlogs/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
