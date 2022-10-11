import { useEffect, useRef, useState } from 'react';
import classes from "./form.module.scss";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hookes/useAuth';
import axios, { axiosPrivate } from '../../api/axios';
import useUser from '../../hookes/useLoggedUser';
const LOGIN_URL = '/api/auth/login';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';
  const { setAuth } = useAuth();
  const {setUser} = useUser()
  const emailRef = useRef()
  const [err, setErr] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')



  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErr('')
  }, [email, pwd])



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, { email, password: pwd })
      console.log(res.data);
      const accessToken = res?.data?.accessToken;
      setAuth({ email, pwd, accessToken })
      const response = await axiosPrivate.get('/api/users', {
        "Content-Type": "application/json",
        headers:{
          authorization: `Bearer ${accessToken}`
        }
      });
      setUser(response.data)
      console.log(response.data);
      setPwd('')
      setEmail('')
      navigate(from, {replace: true})

    } catch (err) {
      if (!err?.status) {
        setErr('No Server Response')
      } else if (!err?.originalStatus === 400) {
        setErr('Missing user or password')
      } else if (!err?.originalStatus === 401) {
        setErr('Unauthories')
      } else {
        setErr('Login failiure')
      }
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePwdChange = (e) => {
    setPwd(e.target.value)
  }

  return (
    <div className={classes.formWrapper}>
      <p aria-live="assertive" >{err}</p>
      <h1 className={classes.formWrapper__heading}>Thread</h1>
      <form onSubmit={handleSubmit} className={classes.AuthForm}>
        <input ref={emailRef} value={email} type="text" placeholder='email' onChange={handleEmailChange} />
        <input value={pwd} type="password" placeholder='password' onChange={handlePwdChange} />
        <button>Login</button>
      </form>
      <Link to='/register'>You don't have an account? Signup</Link>
    </div>
  )
}

export default Login