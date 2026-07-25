import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";



function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const [firstName , setFirstName] = useState(user.firstName ||"");
    const [lastName , setLastName] = useState(user.lastName||"");
    const [age , setAge] = useState(user.age ||"");
    const [gender , setGender] = useState(user.gender ||"");
    const [photoUrl , setPhotoUrl] = useState(user.photoUrl||"");
    const [about , setAbout] = useState(user.about ||"");
    const [skills , setSkills] = useState(user.skills||[]);
    
   


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
        <div className="min-h-screen bg-slate-900 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
         
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">
            Edit Profile
          </h1>
      
          <form
            onSubmit={handleEditProfile}
            className="space-y-5"
          >
            <div>
              <label className="block text-white mb-2">
                First Name
              </label>
      
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
      
            <div>
              <label className="block text-white mb-2">
                Last Name
              </label>
      
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
      
            <div className="grid grid-cols-2 gap-5">
      
              <div>
                <label className="block text-white mb-2">
                  Age
                </label>
      
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
      
              <div>
                <label className="block text-white mb-2">
                  Gender
                </label>
      
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
      
            </div>
      
            <div>
              <label className="block text-white mb-2">
                Photo URL
              </label>
      
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
      
            <div>
              <label className="block text-white mb-2">
                About
              </label>
      
              <textarea
                rows="4"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell other developers about yourself..."
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
      
            <div>
              <label className="block text-white mb-2">
                Skills
              </label>
      
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, MongoDB..."
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
      
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Save Profile
            </button>
      
          </form>
        </div>

        <div className="flex justify-center lg:w-[380px]">
          <UserCard user={{firstName , lastName , age , gender , photoUrl , about , skills}} />
       </div>
 
        </div>
      </div>
     );
}

export default EditProfile;