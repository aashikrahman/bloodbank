import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Profile = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
  return (
    <div>
        <h2>Welcome {user.role}</h2>
        
    </div>
    
  )
}

export default Profile