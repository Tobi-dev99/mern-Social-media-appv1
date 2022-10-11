import React, { useState } from 'react'
import axios from '../../../api/axios';
import classes from './EditProfile.module.scss';

// import { CgCheck, CgClose } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hookes/useLoggedUser';

const EditProfile = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        name: user.name || '',
        desc: user.desc || '',
        city: user.city || '',
        state: user.state || '',
        birthday: user.birthday || '',
        gender: user.gender || '',
        userId: user._id,
    });
    const [avatarData, setAvatarData] = useState();

    const onChangeHandler = (e) => {
        const field = e.target.name

        if (field === "avatar") {
            setAvatarData(e.target.files[0]);
            return;
        }
        setInfo(prev => {
            prev[field] = e.target.value
            return { ...prev }
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(JSON.stringify(info));

        if(avatarData){
            const formData = new FormData();
            formData.append(`avatar`, avatarData);
            await axios.put('/api/users/upload/'+user._id, formData )
        }


        try {
            await axios.put('/api/users/' + user._id, info);
            navigate('/profile')
        } catch (error) {
            console.log(error);
        }
    }
    const closeEdit = (e) => {
        e.preventDefault()
        navigate('/profile')
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__heading}>
                <h3>Edit Profile</h3>
            </div>
            <hr />
            <form onSubmit={submitHandler}>
                <div className={classes.inputs}>
                    <input type="file" name='avatar' onChange={onChangeHandler} />
                    <label>Profile Picture</label>
                </div>
                <div className={classes.inputs}>
                    <input type="text" name='name' value={info.name} onChange={onChangeHandler} />
                    <label>Name</label>
                </div>
                <div className={classes.inputs}>
                    <input type="text" name='desc' value={info.desc} onChange={onChangeHandler} />
                    <label>Bio</label>
                </div>
                <div className={classes.inputs}>
                    <input type="text" name='city' value={info.city} onChange={onChangeHandler} />
                    <label>City</label>
                </div>
                <div className={classes.inputs}>
                    <input type="text" name='state' value={info.state} onChange={onChangeHandler} />
                    <label>State</label>
                </div>
                <div className={classes.inputs}>
                    <input type="date" name='birthday' value={info.birthday} onChange={onChangeHandler} />
                    <label>Birthday</label>
                </div>

                <div className={classes.inputs}>
                    <input type="text" name='gender' value={info.gender} onChange={onChangeHandler} />
                    <label>Gender</label>
                </div>
                <div className={classes.inputs__buttons}>
                    <button>Confirm</button>
                    <button type='button' className={classes.cancel} onClick={closeEdit}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile