import React from 'react'
import { AiOutlineMessage } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hookes/useAuth';
import useUser from '../../hookes/useLoggedUser';
import classes from './Header.module.scss';

const Header = ({username}) => {
  const {setAuth} = useAuth()
  const {setUser} = useUser()
  const navigate = useNavigate()
  const logoutHandler = async(e) => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null)
      setAuth(null)
      navigate('/login', {replace:true})
    } catch (err) {
      
    }
  }
  return (
    <header className={classes.header}>
        <h2>{username? username : 'Thread'}</h2>
        {username? <p onClick={logoutHandler} style={{color: 'crimson'}} >Logout</p>: <AiOutlineMessage />}
           
    </header>
  )
}

export default Header