import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import FilterJobs from "./FilterJobs";

const Jobs = () => {
  return (
    <div className="flex gap-8 mt-5">
      <div className="min-w-[20%]">
        {/* job filter component  */}
        <FilterJobs />
      </div>

      <div className="grid grid-cols-3 gap-5 overflow-y-scroll">
        {/* single job profile card */}
        <div className="shadow-lg border border-gray-200 py-5 pl-4 pr-3 rounded-lg h-fit">
          <div className="flex justify-between text-sm">
            <div>2 days ago</div>
            <div>
              <Bookmark className="w-[18px]" />
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
            <Button variant="outline">Details</Button>
            <Button>Save for later</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
