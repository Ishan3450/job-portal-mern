import React from "react";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="w-[90%] m-auto py-5">
      <h1 className=" text-4xl font-bold">Job Openings</h1>
      <div className="grid grid-cols-3 mt-8 w-full gap-5">
        {/* single job card */}
        {allJobs.map((job) => {
          return (
            <div className="shadow-lg border border-gray-200 py-3 pl-4 pr-3 rounded-lg">
              <div className="font-semibold text-lg">{job.company.name}</div>
              <div className=" text-gray-500">{job.company.location}</div>
              <div className="mt-3 text-lg font-bold">{job.title}</div>
              <div className="text-sm text-gray-500">
                {job.description}
              </div>
              <ul className="flex gap-3 mt-5 text-xs">
                <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-blue-700">
                  {job.positions} Positions
                </li>
                <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-red-600">
                  {job.jobType}
                </li>
                <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-purple-800">
                  {job.salary} LPA
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestJobs;
