import React, { useEffect, useState } from "react";
import FilterJobs from "./FilterJobs";
import SingleJobCard from "./SingleJobCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="flex gap-8 mt-5">
      <div className="min-w-[20%]">
        {/* job filter component  */}
        <FilterJobs />
      </div>

      <div className="grid grid-cols-1 gap-5 overflow-y-scroll max-h-[85vh] w-full p-2">
        {/* single job profile card */}
        {allJobs.map((job) => (
          <SingleJobCard job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
