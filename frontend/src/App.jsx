import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import ProtectedRoute from "./component/ProtectedRoute";
import Connection from "./pages/Connection";
import Request from "./pages/Request";

import { addUser } from "./utils/userSlice";
import { baseUrl } from "./utils/constant";

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
        console.log(error.response?.status);
        
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
    <BrowserRouter>
    <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>} />

            <Route path="/login" element={ user ? <Navigate to="/feed" replace/> : <Login />} />

            <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path="/feed" element={<ProtectedRoute> <Feed/> </ProtectedRoute>} />
            <Route path="/requests" element={<ProtectedRoute><Request/></ProtectedRoute>} />
            <Route path="/connections" element={<ProtectedRoute><Connection/></ProtectedRoute>}/>
          </Routes>
        </main>
        <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;