import { Check, Edit2, MoreHorizontal, X } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import toast from "react-hot-toast";

const AdminJobDetails = () => {
  const { id } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const updateApplicationStatus = async (status, applicationId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/jobs/applications/updateStatus/${applicationId}`,
        { status },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div>
      <div className="border mt-5 rounded-xl p-8">
        <div className="flex justify-between">
          <div className="flex gap-5 items-center">
            <div className="max-w-5xl flex flex-col gap-5">
              <div className="flex gap-2 items-baseline">
                <h1 className="text-2xl font-semibold">{singleJob.title}</h1>
                <span className="text-xl font-extrabold text-gray-400">at</span>
                <h2 className="text-2xl font-semibold underline">
                  {singleJob.company.name}
                </h2>
              </div>

              <hr />

              <div>
                <div className="italic text-gray-400 font-bold">
                  Job Description
                </div>
                <div className=" text-xl">{singleJob.description}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="italic text-gray-400 font-bold">Job Type</div>
                  <div className=" text-xl">{singleJob.jobType}</div>
                </div>
                <div>
                  <div className="italic text-gray-400 font-bold">Salary</div>
                  <div className=" text-xl">{singleJob.salary} LPA</div>
                </div>
                <div>
                  <div className="italic text-gray-400 font-bold">Location</div>
                  <div className=" text-xl">{singleJob.location}</div>
                </div>
              </div>

              <div>
                <div className="italic text-gray-400 font-bold">
                  Requirements
                </div>
                <div className=" text-xl">{singleJob.requirements}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="italic text-gray-400 font-bold">
                    Experience
                  </div>
                  <div className=" text-xl">{singleJob.experience} Years</div>
                </div>
                <div>
                  <div className="italic text-gray-400 font-bold">
                    Positions
                  </div>
                  <div className=" text-xl">{singleJob.positions} Openings</div>
                </div>
                <div>
                  <div className="italic text-gray-400 font-bold">
                    Posted on
                  </div>
                  <div className=" text-xl">
                    {singleJob.createdAt.split("T")[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="border h-fit p-2 rounded-lg cursor-pointer"
            onClick={() => navigate(`/admin/job/edit/${singleJob._id}`)}
          >
            <Edit2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="border my-5 rounded-xl p-8">
        <div className="text-2xl font-bold text-gray-400">
          Applicants ({singleJob.applicants.length})
        </div>
        <Table className="text-md mt-4 border-t">
          <TableCaption>A list of applicants applied to this job.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date (Applied on)</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {singleJob.applicants
              .filter((applicant) => applicant.applicant != null)
              .map((applicant, index) => (
                <TableRow key={index}>
                  <TableCell>{applicant.applicant.fullname}</TableCell>
                  <TableCell>{applicant.applicant.email}</TableCell>
                  <TableCell>{applicant.applicant.phone}</TableCell>
                  <TableCell>
                    {applicant.applicant.profile.resumeUrl ? (
                      <a
                        href={applicant.applicant.profile.resumeUrl}
                        target="_blank"
                        className="text-blue-400 hover:underline"
                      >
                        Resume
                      </a>
                    ) : (
                      "NA"
                    )}
                  </TableCell>
                  <TableCell>{applicant.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    {applicant.status === "pending" ? (
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-fit flex flex-col gap-2">
                          <div
                            className="flex gap-1 items-center cursor-pointer"
                            onClick={() => updateApplicationStatus("accepted", applicant._id)}
                          >
                            <Check className="w-[20px] text-green-500" />
                            Accept
                          </div>
                          <hr />
                          <div
                            className="flex gap-1 items-center cursor-pointer"
                            onClick={() => updateApplicationStatus("rejected", applicant._id)}
                          >
                            <X className="w-[20px] text-red-500" /> Reject
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : applicant.status === "accepted" ? (
                      "Accepted"
                    ) : (
                      "Rejected"
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobDetails;
