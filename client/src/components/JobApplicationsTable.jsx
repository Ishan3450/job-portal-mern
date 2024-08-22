import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PendingBadge = () => {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      Pending
    </span>
  );
};

const RejectedBadge = () => {
  return (
    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      Rejected
    </span>
  );
};

const AcceptedBadge = () => {
  return (
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      Accepted
    </span>
  );
};

const JobApplicationsTable = () => {
  const status = "accepted";
  return (
    <div>
      <Table>
        <TableCaption>A List of your Job Applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">17-07-24</TableCell>
            <TableCell>Frontend Developer</TableCell>
            <TableCell>Google</TableCell>
            <TableCell className="text-right">
              {status === "pending" ? (
                <PendingBadge />
              ) : status === "accepted" ? (
                <AcceptedBadge />
              ) : (
                <RejectedBadge />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default JobApplicationsTable;
