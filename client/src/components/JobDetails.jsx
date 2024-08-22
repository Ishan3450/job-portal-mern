import React from "react";
import { useParams } from "react-router-dom";
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

const JobDetails = () => {
  const { id } = useParams();
  const isApplied = false;
  return (
    <div className="border my-5 rounded-xl p-8">
      <div className="flex justify-between">
        <div>
          <div className="text-2xl font-semibold">Company Name</div>
          <div className="my-5">
            <ul className="flex gap-3 text-sm">
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
          </div>
        </div>
        <div>
          <Button disabled={isApplied} variant={isApplied ? "secondary" : ""}>
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
            <TableCell>Frontend Developer</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Location</TableCell>
            <TableCell>Ahmedabad</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Description</TableCell>
            <TableCell>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              doloribus velit exercitationem commodi quibusdam facere cum,
              repellendus architecto porro dignissimos iusto voluptatem, dolores
              deserunt ad veniam voluptas? Iste, aperiam modi.
            </TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Experience</TableCell>
            <TableCell>2 years</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Salary</TableCell>
            <TableCell>12 LPA</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Total Applicants</TableCell>
            <TableCell>4</TableCell>
          </TableRow>
          <TableRow className="text-lg">
            <TableCell className="font-medium">Posted on</TableCell>
            <TableCell>17-07-24</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default JobDetails;
