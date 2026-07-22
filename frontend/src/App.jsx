import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Profile from "./component/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;