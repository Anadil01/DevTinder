import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserCard from "../component/UserCard";
import { addFeed } from "../utils/feedSlice";
import { baseUrl } from "../utils/constant";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const feedData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/feed`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    feedData();
  }, []);
  if(!feed) return null;
  if (feed.length === 0) {
    return (
      <h1 className="text-center text-3xl mt-10">
        No New Users Found
      </h1>
    );
  }
  return (
    <div className="flex justify-center mt-10">
    <UserCard user={feed[0]} />
  </div>
  );
}

export default Feed;