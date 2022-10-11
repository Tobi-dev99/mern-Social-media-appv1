import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts';
import useAxiosPrivate from '../../hookes/useAxiosPrivate';
import useUser from '../../hookes/useLoggedUser';
import noAvatar from '../../images/noAvatar.png'
import classes from './Profile.module.scss';

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate()
  let content = <p>User not found</p>
  const clickEditHandler = () => {
    navigate('/profile/edit')
  }

  const clickPostHandler = () => {
    navigate('/profile/create')
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get('/api/users');
        setUser(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  }, [axiosPrivate, setUser])

  if (user) {
    content = <div className='wrapper'>
      <Header username={user.username} />
      <div className={classes.ProfileInfo}>
        <div className={classes.ProfileInfo__imgContainer}>
          <img src={user.avatar || noAvatar} alt="" />
          <p className={classes.ProfileInfo__name}>{user.name}</p>
        </div>
        <div className={classes.ProfileInfo__info}>{user.posts.length} <p>Posts</p></div>
        <div className={classes.ProfileInfo__info}>{user.followers.length} <p>Followers</p></div>
        <div className={classes.ProfileInfo__info}>{user.following.length} <p>Following</p></div>
      </div>
      <p className={classes.ProfileInfo__desc}>{user.desc}</p>
      <div className={classes.ProfileInfo__btns}>
        <button onClick={clickEditHandler}>Edit Profile</button>
        <button onClick={clickPostHandler}>Add a post</button>
      </div>
      <Posts Profile={user}/>

    </div>
  }

  return (<>
    {content}
  </>
  )
}

export default Profile