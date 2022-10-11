import User from "./User/User"


const Users = ({users}) => {
    return (<>
        {users? users.map(user=> <User key={user._id} user = {user} />) :<p>No user found</p>}
    </>
    )
}

export default Users