import { createBrowserRouter, RouterProvider , Navigate} from "react-router-dom";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import ProtectedRoute from "./component/ProtectedRoute";
import Connection from "./pages/Connection";
import Request from "./pages/Request";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";


import { addUser } from "./utils/userSlice";
import { baseUrl } from "./utils/constant";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/profile/view`, {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      } catch (error) {
        if (error.response?.status === 401) {
            dispatch(addUser(null));
        } else {
            console.error(error);
        }
    }finally {
      setLoading(false);
    }
    };

    fetchUser();
  }, [dispatch]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <RouterProvider router={router}/>
  );
};

const router = createBrowserRouter([
  {
    element:<AuthLayout/>,
    children:[
      {
      path: "/",
      element: <Navigate to="/login" replace />
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      }
    ],
  },
  {
    element:<MainLayout/>,
    children:[
      {
        element:<ProtectedRoute/>,
        children:[
          {
            path:"/",
            element:<Navigate path="/feed" replace/>
          },
          {
            path:"/profile",
            element:<Profile/>
          },
          {
            path:"/feed",
            element:<Feed/>
          },
          {
            path:"/requests",
            element:<Request/>
          },
          {
            path:"/connections",
            element:<Connection/>
          },
          {
            path:"/chat/:id",
            element:<Chat/>
          }
        ]
      } 
    ]
  }
]);


export default App;