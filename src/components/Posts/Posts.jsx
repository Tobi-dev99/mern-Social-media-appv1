import React, { useEffect, useState } from 'react'
import axios from '../../api/axios'
import Post from './Post/Post'

const Posts = ({Profile}) => {

  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const getPosts = async()=>{
      
      try {
        const res = await axios.get(`/api/post/${Profile._id}`)
        let data = res.data
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(data)
      } catch (error) {
        console.log(error);
      }
    }
    getPosts()
  }, [Profile._id])
  return (
    <div>
      {posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  )
}

export default Posts