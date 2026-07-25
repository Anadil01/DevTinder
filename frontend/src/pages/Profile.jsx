import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../component/EditProfile"


function Profile() {

    const user = useSelector((store) => store.user);

    return ( 
        <div>  
          <EditProfile/>
        
        </div>
     );
}

export default Profile;