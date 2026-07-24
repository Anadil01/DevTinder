import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../component/EditProfile"


function Profile() {

    const user = useSelector((store) => store.user);

    return ( 
        <div>  
          <EditProfile user={user}/>
          <h1>{user?.firstName} {user?.lastName}</h1> 
        </div>
     );
}

export default Profile;