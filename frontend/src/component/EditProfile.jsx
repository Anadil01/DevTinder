import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { toast } from "react-toastify";



function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [age , setAge] = useState("");
    const [gender , setGender] = useState("");
    const [photoUrl , setPhotoUrl] = useState("");
    const [about , setAbout] = useState("");
    
    useEffect(() => {
      if (!user) return;
    
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setPhotoUrl(user.photoUrl || "");
      setAbout(user.about || "");
    }, [user]);


    const handleEditProfile = async (e)=>{
      e.preventDefault();
        try{
            const res = await axios.patch(`${baseUrl}/profile/edit`, 
                {firstName , lastName, age , gender, photoUrl , about } , {withCredentials:true});

          dispatch(addUser(res.data));
          toast.success("Profile Updated Sucessfully");
        }catch(error){
         console.log(error.response?.data);
         toast.error(error.response?.data);
        }
    }


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
                className="w-1/2 px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
      
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Save Profile
            </button>
      
          </form>
        </div>

        <div className="flex justify-center items-center lg:w-[380px] mt-25">
          <UserCard user={{firstName , lastName , age , gender , photoUrl , about}} />
       </div>
 
        </div>
      </div>
     );
}

export default EditProfile;