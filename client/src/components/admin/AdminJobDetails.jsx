import { Edit2, MoreHorizontal } from "lucide-react";
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

const AdminJobDetails = () => {
  const { id } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const navigate = useNavigate();

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
                <div className="text-gray-400 font-bold">Job Description</div>
                <div className="italic text-xl">{singleJob.description}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="text-gray-400 font-bold">Job Type</div>
                  <div className="italic text-xl">{singleJob.jobType}</div>
                </div>
                <div>
                  <div className="text-gray-400 font-bold">Salary</div>
                  <div className="italic text-xl">{singleJob.salary} LPA</div>
                </div>
                <div>
                  <div className="text-gray-400 font-bold">Location</div>
                  <div className="italic text-xl">{singleJob.location}</div>
                </div>
              </div>

              <div>
                <div className="text-gray-400 font-bold">Requirements</div>
                <div className="italic text-xl">{singleJob.requirements}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="text-gray-400 font-bold">Experience</div>
                  <div className="italic text-xl">
                    {singleJob.experience} Years
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 font-bold">Positions</div>
                  <div className="italic text-xl">
                    {singleJob.positions} Openings
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 font-bold">Posted on</div>
                  <div className="italic text-xl">
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
        <Table>
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
            {singleJob.applicants.filter(applicant => applicant.applicant != null).map((applicant) => (
              <TableRow>
                <TableCell>{applicant.applicant.fullname}</TableCell>
                <TableCell>{applicant.applicant.email}</TableCell>
                <TableCell>{applicant.applicant.phone}</TableCell>
                <TableCell><a href={applicant.applicant.profile.resumeUrl || "#"} target="_blank" className="text-blue-400 hover:underline">Resume</a></TableCell>
                <TableCell>{applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <MoreHorizontal />
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
