import React from 'react'
import classes from './User.module.scss';
import imgSrc from '../../../images/noAvatar.png'
import { useNavigate } from 'react-router-dom';

const User = ({user}) => {
  const navigate = useNavigate();
  const clickHandler = () =>{
    navigate(`/user/${user._id}`);
  }
  return (
    <div onClick={clickHandler} className={classes.user}>
      <img src={user.avatar || imgSrc} alt="" />
      <p>{user.username}</p>
    </div>
  )
}

export default User