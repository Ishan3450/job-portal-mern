import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import { Toaster } from "react-hot-toast";
import Jobs from "./components/Jobs";
import NavBar from "./components/common/NavBar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";

function App() {
  return (
    <div className="max-w-[90vw] m-auto min-h-screen">
      <Toaster />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="jobs/description/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/browse" element={<Browse />} /> */}
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
