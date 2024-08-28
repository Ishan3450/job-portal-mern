import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import { Toaster } from "react-hot-toast";
import Jobs from "./components/Jobs";
import NavBar from "./components/common/NavBar";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import UpdateCompanyDetails from "./components/admin/UpdateCompanyDetails";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import EditJobDetails from "./components/admin/EditJobDetails";
import AdminJobDetails from "./components/admin/AdminJobDetails";
import Browse from "./components/Browse";

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
          <Route path="/jobs/description/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<Browse />} />

          {/* admin routes */}
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/companies/create" element={<CreateCompany />} />
          <Route
            path="/admin/companies/edit/:id"
            element={<UpdateCompanyDetails />}
          />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/jobs/post" element={<PostJob />} />

          <Route path="/admin/job/edit/:id" element={<EditJobDetails />} />
          <Route path="/admin/job/details/:id" element={<AdminJobDetails />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
