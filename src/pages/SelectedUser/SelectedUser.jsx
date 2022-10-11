import classes from './SelectedUser.module.scss';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import useAxiosPrivate from '../../hookes/useAxiosPrivate';
import { useNavigate, useParams } from 'react-router-dom';
import noAvatar from '../../images/noAvatar.png'
import useUser from '../../hookes/useLoggedUser';
import axios from '../../api/axios';
import Posts from '../../components/Posts/Posts';

const SelectedUser = () => {
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false)
    const { user, setUser } = useUser();
    const axiosPrivate = useAxiosPrivate();
    const { userId } = useParams()
    useEffect(() => {
        if (user.following.includes(userId)) {
            setIsFollowing(true)
        }
        const fetchUser = async () => {
            if (user._id === userId) {
                navigate('/profile')
            }
            try {
                const res = await axios.get('/api/users/' + userId);
                setUserInfo(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [axiosPrivate, userId, navigate, user, isFollowing])

    const followHandler = async () => {
        try {
            const res = await axiosPrivate.get(`/api/users/${userId}/follow`);
            const userRes = await axiosPrivate.get(`/api/users`);
            setUser(userRes.data)
            console.log(userRes.data);
            if (res.data === "followed") {
                setIsFollowing(true)
            } else if (res.data === 'unfollowed') {
                setIsFollowing(false)
            }
        } catch (err) {
            console.log(err);
        }
    }

    let content = userInfo ? <>
        <Header username={userInfo.username} />
        <div className={classes.SelectedInfo}>
            <div>
                <img src={userInfo.avatar || noAvatar} alt="" />
                <p className={classes.SelectedInfo__name}>{userInfo.name}</p>
            </div>
            <div className={classes.SelectedInfo__info}>{userInfo.posts.length} <p>Posts</p></div>
            <div className={classes.SelectedInfo__info}>{userInfo.followers.length} <p>Followers</p></div>
            <div className={classes.SelectedInfo__info}>{userInfo.following.length} <p>Following</p></div>
        </div>
        <p className={classes.SelectedInfo__desc}>{userInfo.desc}</p>
        <div className={classes.SelectedInfo__btns}>
            <button onClick={followHandler}>{isFollowing ? "Unfollow" : 'Follow'}</button>
        </div>
        <Posts Profile={userInfo} />
    </> : <p>No content</p>
    return (
        <>
            {content}
        </>

    )
}

export default SelectedUser