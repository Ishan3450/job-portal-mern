import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetJobById from "@/hooks/useGetJobById";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useGetJobById(id);
  const { user } = useSelector((store) => store.auth);
  const userId = user?._id;

  const isAlreadyApplied = () => {
    return job?.applicants.some(
      (applicantObj) => applicantObj.applicant === userId
    );
  };
  const isApplied = isAlreadyApplied();

  const applyJob = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/jobs/applications/apply/${id}`,
        {},
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error();
      }

      toast.success(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="border my-5 rounded-xl p-8">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-semibold flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {job?.company?.name}
          </div>
          <div className="my-5">
            <ul className="flex gap-3 text-sm">
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
          </div>
        </div>
        <div>
          <Button
            disabled={isApplied}
            variant={isApplied ? "secondary" : ""}
            onClick={!isApplied ? applyJob : null}
          >
            {isApplied ? "Already applied" : "Apply"}
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">Job Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Role</TableCell>
            <TableCell>{job?.title}</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Location</TableCell>
            <TableCell>{job?.company?.location}</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Description</TableCell>
            <TableCell>{job?.description}</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Experience</TableCell>
            <TableCell>{job?.experience} years</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Salary</TableCell>
            <TableCell>{job?.salary} LPA</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Total Applicants</TableCell>
            <TableCell>{job?.applicants.length}</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Posted on</TableCell>
            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default JobDetails;
