import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios'
import useUser from '../../../hookes/useLoggedUser';
import Post from '../Post/Post';

const TimelinePosts = ({timeline}) => {
    const { user } = useUser();
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getPosts = async () => {
            if (timeline) {
            try {
                const res = await axios.get(`/api/post/timeline/${user._id}`);
                let data = res.data
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(data)
            } catch (error) {
                console.log(error);
            }
        }
        }
        getPosts()
    }, [timeline, user._id])
    return (
        <div>
            {posts.map(post => <Post key={post._id} post={post} />)}
        </div>
    )
}

export default TimelinePosts