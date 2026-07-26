import axios from "axios";
import { baseUrl } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { addRequest } from "../utils/requestSlice";


function Request() {
   const dispatch = useDispatch();


    const fetchReviewRequest = async ()=>{

    try{
    const res = await axios.get(`${baseUrl}/user/request/recieved` , {withCredentials:true});

    console.log(res);

    dispatch(addRequest(res.data.data));
    }catch(error){
          console.log(error);
    }   
    }

    useEffect(()=>{
        fetchReviewRequest();
    },[]);

    return ( 
        <div>
            <h1>Requests page!</h1>
        </div>
     );
}

export default Request;