import React, { useEffect } from "react";

import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <HeroSection />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
