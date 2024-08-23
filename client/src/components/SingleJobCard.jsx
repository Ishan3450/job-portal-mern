import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const SingleJobCard = ({ job }) => {
  const calculateDaysDifference = useCallback(() => {
    const jobCreationDateAndTime = new Date(job.createdAt);
    const currDateAndTime = new Date();
    const timeDifferenceInMilliseconds =
      currDateAndTime - jobCreationDateAndTime;
    const totalDays = Math.floor(
      timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000)
    );

    return totalDays;
  }, [job._id]);

  const daysAfterPublished = calculateDaysDifference();

  return (
    <div className="shadow-lg border border-gray-200 py-5 pl-4 pr-3 rounded-lg h-fit">
      <div className="flex justify-between text-sm">
        <div>{daysAfterPublished === 0 ? "Today" : `${daysAfterPublished} days ago` } </div>
        <div>
          <Bookmark className="w-[18px] text-gray-500" />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-[52px] border rounded-xl">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://e7.pngegg.com/pngimages/882/225/png-clipart-google-logo-google-logo-google-search-icon-google-text-logo-thumbnail.png" />
            <AvatarFallback>Company Logo</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="text-lg">{job?.company?.name}</div>
          <div className=" text-gray-500">{job?.company?.location}</div>
        </div>
      </div>
      <div className="mt-3 text-lg font-bold">{job?.title}</div>
      <div className="text-sm text-gray-500">{job?.description}</div>
      <ul className="flex gap-3 mt-5 text-xs">
        <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-blue-700">
          {job?.positions} Positions
        </li>
        <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-red-600">
          {job?.jobType}
        </li>
        <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-purple-800">
          {job?.salary} LPA
        </li>
      </ul>
      <div className="flex gap-2 mt-4">
        <Link to={`/jobs/description/${job?._id}`}>
          <Button variant="outline">Details</Button>
        </Link>
        <Button>Save for later</Button>
      </div>
    </div>
  );
};

export default SingleJobCard;
