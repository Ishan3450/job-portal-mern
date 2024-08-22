import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const SingleJobCard = () => {
  const jobId = "1sda321sdg65df4g23asd1f32sd";
  return (
    <div className="shadow-lg border border-gray-200 py-5 pl-4 pr-3 rounded-lg h-fit">
      <div className="flex justify-between text-sm">
        <div>2 days ago</div>
        <div>
          <Bookmark className="w-[18px] text-gray-500" />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="w-[52px] border rounded-xl">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://e7.pngegg.com/pngimages/882/225/png-clipart-google-logo-google-logo-google-search-icon-google-text-logo-thumbnail.png" />
            <AvatarFallback>Company</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <div className="text-lg">Company Name</div>
          <div className=" text-gray-500">India</div>
        </div>
      </div>
      <div className="mt-3 text-lg font-bold">Job Title</div>
      <div className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        provident nesciunt, sequi nihil cupiditate error?
      </div>
      <ul className="flex gap-3 mt-5 text-xs">
        <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-blue-700">
          12 Positions
        </li>
        <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-red-600">
          Part time
        </li>
        <li className="border border-gray-200 px-2 py-1 font-bold rounded-full text-purple-800">
          12 LPA
        </li>
      </ul>
      <div className="flex gap-2 mt-4">
        <Link to={`/jobs/description/${jobId}`}>
          <Button variant="outline">Details</Button>
        </Link>
        <Button>Save for later</Button>
      </div>
    </div>
  );
};

export default SingleJobCard;
