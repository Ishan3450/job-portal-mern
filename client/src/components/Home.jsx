import React, { useEffect } from "react";

import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <HeroSection />
      <LatestJobs />
    </div>
  );
};

export default Home;
