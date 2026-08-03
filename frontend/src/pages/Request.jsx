import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addRequest, rejectRequest } from "../utils/requestSlice";


function Request() {
   const dispatch = useDispatch();
   const request = useSelector((store) => store.request);
   

    const fetchReviewRequest = async ()=>{

    try{
    const res = await axios.get(`${baseUrl}/user/request/received` ,
        {withCredentials:true});

    dispatch(addRequest(res.data.data));
    }catch(error){
        console.log(error.response?.data);
    }   
    }

    useEffect(()=>{
        fetchReviewRequest();
    },[]);

    const reviewRequest = async (status , requestId) =>{
        try{
        await axios.post(`${baseUrl}/request/review/${status}/${requestId}` , {} , {withCredentials:true});

        dispatch(rejectRequest(requestId));
        }catch(error){
            console.log(error.response?.data || error.message);
        }
    }

    if (!request) return<h1>You don't have any request</h1>;

    return ( 
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-semibold mb-8">Connection Requests</h1>

            {request.map((req) =>(
            <div key={req._id} className="flex justify-between items-center p-5 bg-slate-800 text-white rounded-xl w-[650px] mb-5">
                <div className="flex items-center gap-5">
                <img src={req.fromUserId.photoUrl} alt={req.fromUserId.firstName} 
                className="w-20 h-20 rounded-full object-cover"/>
                <div>
                    <h2 className="text-xl font-semibold">{req.fromUserId.firstName} {req.fromUserId.lastName}</h2>
                    <p className="text-gray-300">{req.fromUserId.about}</p>
                </div>
            </div>
             <div className="flex gap-3">
                <button onClick={()=> reviewRequest("accepted" , req._id)}
                    className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600"> Accept
                </button>
                <button onClick={() => reviewRequest("rejected" , req._id)}
                     className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">Reject</button>
             </div>
            </div>
            ))}
        </div>
     );
}

export default Request;