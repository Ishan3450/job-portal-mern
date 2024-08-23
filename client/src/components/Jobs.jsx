import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
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

      <div className="grid grid-cols-3 gap-5 overflow-y-scroll">
        {/* single job profile card */}
        {allJobs.map((job) => (
          <SingleJobCard job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
