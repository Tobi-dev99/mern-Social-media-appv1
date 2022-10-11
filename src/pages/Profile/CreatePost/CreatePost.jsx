import React, { useState } from 'react'
import classes from './CreatePost.module.scss';
import { CgCheck, CgClose } from "react-icons/cg";
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hookes/useLoggedUser';

const CreatePost = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const [fileData, setFileData] = useState();
    const [desc, setDesc] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault();
        if (fileData || desc) {
            const formData = new FormData();
            formData.append(`postImg`, fileData)
            formData.append('desc', desc)
            await axios.post('/api/post?userId='+user._id+"&desc="+desc, formData)
            navigate('/profile')
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
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__heading}>
                <h3>Create Post</h3>
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

export default CreatePost