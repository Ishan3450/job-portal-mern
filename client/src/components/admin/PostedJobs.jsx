import React, { useEffect, useState } from "react";
import { Edit, EyeIcon, MoreHorizontalIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const PostedJobs = ({ filter }) => {
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(recruiterJobs);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get(
        "http://localhost:3000/jobs/getRecruiterJobs",
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        setRecruiterJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
      } else {
        toast.error("Something went wrong while fetching your posted jobs");
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = recruiterJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(filter) ||
        job.company.name.toLowerCase().includes(filter)
    );
    setFilteredJobs(filtered);
  }, [filter]);

  return (
    <div className="mt-3 border rounded-lg pb-3">
      <Table className="text-md">
        <TableCaption>A list of your posted jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.map((job, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent className="mx-2 w-fit flex flex-col gap-2">
                      <Link
                        to={`/admin/job/edit/${job._id}`}
                        className="flex gap-[5px] items-center cursor-pointer hover:underline hover:text-blue-400"
                      >
                        <Edit className="w-[18px]" />
                        <div>Edit</div>
                      </Link>
                      <hr />
                      <Link
                        to={`/admin/job/details/${job._id}`}
                        className="flex gap-[5px] items-center cursor-pointer hover:underline hover:text-blue-400"
                      >
                        <EyeIcon className="w-[18px]" />
                        <div>Details</div>
                      </Link>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostedJobs;
