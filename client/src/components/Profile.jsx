import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Contact2, Edit2, Mail } from "lucide-react";
import React, { useState } from "react";
import JobApplicationsTable from "./JobApplicationsTable";
import UpdateProfileDetailsDialog from "./UpdateProfileDetailsDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const haveResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <div className="border mt-5 rounded-xl p-8">
        <div className="flex justify-between">
          <div className="flex gap-5 items-center">
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-20 h-20 rounded-xl"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="max-w-4xl">
              <h1 className="text-2xl font-semibold">{user?.fullname}</h1>
              <div className="italic">{user?.profile.bio}</div>
            </div>
          </div>
          <div
            className="border h-fit p-2 rounded-lg cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Edit2 className="w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col gap-3 my-7">
          <div className="flex gap-2">
            <Mail />
            <div>{user?.email}</div>
          </div>
          <div className="flex gap-2">
            <Contact2 />
            <div>{user?.phone}</div>
          </div>
        </div>

        <div>
          <div className="text-xl font-semibold">Skills</div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {user?.profile.skills.split(",").map((skill) => {
              return (
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        <div className="my-4 flex flex-col gap-1">
          <div className="text-xl font-semibold">Resume</div>
          <div className="font-mono text-lg">
            {haveResume ? (
              <a
                href={user?.profile.resumeUrl ? user?.profile.resumeUrl : "#"}
                className="font-semibold text-blue-400 hover:underline"
              >
                Link
              </a>
            ) : (
              <span>Please upload your resume !!</span>
            )}
          </div>
        </div>
      </div>

      <div className="border my-5 rounded-xl p-8">
        <JobApplicationsTable />
      </div>

      <UpdateProfileDetailsDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
