import React, { useEffect, useState } from 'react'
import Users from '../../components/Users/Users'
import Header from '../../components/Header/Header';
import useAxiosPrivate from '../../hookes/useAxiosPrivate';
import classes from './Search.module.scss';

const Search = () => {
    const [users, setUsers] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([])
    const axiosPrivate = useAxiosPrivate()

    const changeHandler = (e) => {
        setSearchInput(e.target.value);
    }


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const res = await axiosPrivate.get('/api/users/all', {
                    signal: controller.signal,
                    "Content-Type": "application/json"
                });
                isMounted && setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUsers()
        return () => {
            isMounted = false
            controller.abort()
        }

    }, [axiosPrivate])

    useEffect(() => {
        if (!users) return
        const filter = users.filter(user => user.username.startsWith(searchInput))
        setFilteredUsers(filter)
        return () => {

        }
    }, [searchInput, users])
    console.log(users);
    return (
        <section className={classes.search}>
            <Header />
            <input type={'text'} placeholder='Search username' onChange={changeHandler} />
            <hr />
            <Users users={filteredUsers === [] ? users : filteredUsers} />
        </section>
    )
}

export default Search