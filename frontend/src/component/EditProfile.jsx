import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";



function EditProfile() {
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [age , setAge] = useState("");
    const [gender , setGender] = useState("");
    const [photoUrl , setPhotoUrl] = useState("");
    const [about , setAbout] = useState("");
    const [skills , setSkills] = useState([]);
    
    const dispatch = useDispatch();


    const handleEditProfile = async ()=>{
        try{
            const res = await axios.patch(`${baseUrl}/profile/edit)`, 
                {firstName , lastName,age , gender, photoUrl , about , skills} , {withCredentials:true});

          dispatch(addUser(res.data));
        }catch(error){
         console.log(error);
        }
    }

    useEffect(()=>{
        handleEditProfile();
    }, []);


    return ( 
        <div>
            <div>
                <form onSubmit={handleEditProfile}>
                <label>First Name</label>
                <input type="text" value={firstName} placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)}/>
                <label>LastName</label>
                <input type="text" value={lastName} placeholder="Enter First Name" onChange={(e) => setLastName(e.target.value)}/>
                <label>Age</label>
                <input type="number" value={age} placeholder="Plez enter your age!"  onChange={(e)=> setAge(e.target.value)}/>
                <label className="block mb-2 font-medium">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="border rounded-md p-2 w-full">
                 <option value="">Select Gender</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Other">Other</option>
                </select>
                <label>PhotoUrl</label>
                <input type="text" value={photoUrl} placeholder="Please Enter the Photo Url" onChange={(e) => setPhotoUrl(e.target.value)}/>
                <label>about</label>
                <input type="text" value={about} placeholder="Write somthing about Yourself" onChange={(e)=> setAbout(e.target.value)}/>
                <label>skills</label>
                <input type="text" value={skills} placeholder="Add some skills" onChange={(e) => setSkills(e.target.value)}/>
                <button type="button">Save</button>
                </form>
            </div>

            <div>
                
            </div>
        </div>
     );
}

export default EditProfile;