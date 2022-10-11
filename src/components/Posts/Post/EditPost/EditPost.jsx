import React, { useEffect, useState } from 'react'
import classes from './EditPost.module.scss';
import { CgClose } from "react-icons/cg";
import { CgCheck } from "react-icons/cg";
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import useUser from '../../../../hookes/useLoggedUser';

const EditPost = () => {
    const navigate = useNavigate();
    const {user} = useUser()
    const params = useParams()
    const [fileData, setFileData] = useState();
    const [desc, setDesc] = useState('')
    const [post, setPost] = useState()
    const submitHandler = async(e)=>{
        e.preventDefault();
        if (fileData || desc) {
            const formData = new FormData();
            formData.append(`postImg`, fileData)
            formData.append('desc', desc)
            //* if logged user is the creater of the post
            console.log(user._id +' '+ post.userId);
            if(user._id === post.userId){
                await axios.put(`/api/post/${post._id}?userId=${post.userId}&desc=${desc}`, formData)
                navigate('/profile')
            }
        }
    }
    const descChangeHandler = (e) => {
        setDesc(e.target.value)
    }
    const imgChangeHandler = (e) => {
        setFileData(e.target.files[0])
    }
    const closePost = (e) => {
        e.preventDefault()
        navigate('/profile')
    }
    useEffect(() => {
      const getPost = async()=>{
        try {
           const res = await axios.get('/api/post?id='+params.id);
            setPost(res.data)
        } catch (err) {
            console.log(err);
        }
    }
    getPost()
    
      
    }, [params.id])
    
  return (
      <div className={classes.wrapper}>
          <div className={classes.wrapper__heading}>
              <h3>Edit Post</h3>
          </div>
          <hr />
          <form onSubmit={submitHandler}>
              <div className={classes.inputs}>
                  <input type="file" name='postImg' onChange={imgChangeHandler} />
                  <label>Post Image</label>
              </div>
              <div className={classes.inputs}>
                  <input type="text-area" name='desc' value={desc} onChange={descChangeHandler} />
                  <label>Description</label>
              </div>
              <div className={classes.inputs__buttons}>
                  <button>Confirm <CgCheck /></button>
                  <button type='button' className={classes.cancel} onClick={closePost}>Cancel <CgClose /></button>
              </div>
          </form>
      </div>
  )
}

export default EditPost