import { useRef } from 'react'
import classes from "./form.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate();
    const sendRequest = async (e) => {
        e.preventDefault();
        const userData = {
            email: email.current.value, username: username.current.value, password: password.current.value
        }
        try {
            await axios.post('/api/auth/register', userData).then(() => {
                setIsError(false)
                navigate('/login')
            })
        } catch (error) {
            if (error) {
                console.log(error);
                setIsError(true)
            }
        }
    }
    return (
        <div className={classes.formWrapper}>
            <h1 className={classes.formWrapper__heading}>Thread</h1>
            <form className={classes.AuthForm} onSubmit={sendRequest}>
                <input ref={username} type="text" placeholder='username' />
                <input ref={email} type="email" placeholder='email' />
                <input ref={password} type="password" placeholder='password' />
                <button>Signup</button>
                {isError && <p>Something went wrong!</p>}
            </form>
            <Link to='/login'>You already have an account? Login</Link>
        </div>
    )
}

export default Register