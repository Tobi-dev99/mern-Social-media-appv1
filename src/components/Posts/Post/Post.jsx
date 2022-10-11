import React, { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import classes from './Post.module.scss'
import { MdInsertEmoticon } from 'react-icons/md';
import { IoIosOptions } from 'react-icons/io';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsBookmark } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import axios from '../../../api/axios';
import useUser from '../../../hookes/useLoggedUser';
import useAxiosPrivate from '../../../hookes/useAxiosPrivate';

const Post = ({ post }) => {
  const axiosPrivate = useAxiosPrivate();
  const [isLiked, setIsLiked] = useState(false);
  const { user: loggedUser } = useUser();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [isShowing, setIsShowing] = useState(false)


  const optionHandler = (e) => {
    setIsShowing(!isShowing);
  }


  const openEditor = (e) => {
    navigate(`/post/${post._id}/edit`)
  }


  const deletePost = async (e) => {
    try {
      await axiosPrivate.delete(`/api/post/${post._id}`)
    } catch (error) {
      console.log(error.message);
    }
  }

  const likePostHandler =async() => {
    try {
      await axiosPrivate.put('/api/post/like/' + post._id)
      const res = await axios.get('/api/users/' + post.userId)
      setUser(res.data)
      setIsLiked(!isLiked)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getPostUser = async () => {
      const res = await axios.get('/api/users/' + post.userId)
      setUser(res.data)
    }
    getPostUser()
    post.likes.includes(loggedUser._id) ? setIsLiked(true) : setIsLiked(false);
  }, [post.userId, loggedUser._id, post.likes])
  
  // useEffect(() => {
  // }, [loggedUser._id, post.likes])
  


  return (
    <div className={classes.post}>
      <div className={classes.post__info}>
        <div className={classes.user}>
          <div className={classes.profile_pic}>
            <img src={user.avatar} alt="" />
          </div>
          <p className={classes.username}>{user.username}</p>
        </div>
        {post.userId === loggedUser._id ?
          <div className={classes.post_options}>
            <ul className={isShowing ? classes.show : ''}>
              <li onClick={openEditor}>Edit</li>
              <li onClick={deletePost} className={classes.red}>Delete</li>
            </ul>
            <IoIosOptions onClick={optionHandler} />
          </div> : ''}
      </div>
      <img src={post.postImg} className={classes.post_img} alt="" />
      <div className={classes.post_content}>
        <div className={classes.reaction_wrapper}>
          <div onClick={likePostHandler}>{isLiked ? <BsHeartFill /> : <BsHeart />}</div>
          <GoComment />
          <IoPaperPlaneOutline />
          <BsBookmark />
        </div>
        <p className={classes.post_likes}>{post.likes.length} likes</p>
        <p className={classes.post_desc}><span>{user.username}</span>{post.desc}</p>
        <p className={classes.post_time}><TimeAgo date={post.createdAt} /></p>
      </div>
      <div className={classes.comment_wrapper}>
        <MdInsertEmoticon />
        <input type="text" className={classes.comment_box} placeholder="Write a comment..." />
        <button className={classes.comment_btn}>post</button>
      </div>
    </div>
  )
}

export default Post