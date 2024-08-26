import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import PostedJobs from "./PostedJobs";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  return (
    <div className="mt-5">
      <h2 className="text-4xl font-semibold dark:text-white">
        Jobs posted by you
      </h2>
      <div className="flex justify-between w-full items-center space-x-2 mt-6">
        <Input
          type="text"
          placeholder="Search by company name or job role"
          className="max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/jobs/post")}>
          Post new job
        </Button>
      </div>

      {/* posted jobs table */}
      <PostedJobs filter={filter}/>
    </div>
  );
};

export default AdminJobs;
