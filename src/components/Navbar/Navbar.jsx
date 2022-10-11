import React from 'react';
import { NavLink } from 'react-router-dom';
import { GrHomeRounded, GrSearch } from "react-icons/gr";
import { RiHeartLine } from "react-icons/ri";
import noAvatar from '../../images/noAvatar.png'
import classes from './Navbar.module.scss';
import useUser from '../../hookes/useLoggedUser';


const Navbar = () => {
  const {user} = useUser();
  return (
    <nav>
        <ul className={classes.navBar}>
            <li><NavLink to={'/home'} ><GrHomeRounded /></NavLink></li>
            <li><NavLink to={'/search'}><GrSearch /></NavLink></li>
            <li><NavLink><RiHeartLine /></NavLink></li>
            <li><NavLink to={'/profile'}><img src={user.avatar || noAvatar} alt=''/></NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar