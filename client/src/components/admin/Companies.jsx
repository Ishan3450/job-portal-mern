import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RegisteredCompanies from "./RegisteredCompanies";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  return (
    <div className="mt-5">
      <h2 className="text-4xl font-semibold dark:text-white">
        Companies registered by you
      </h2>
      <div className="flex justify-between w-full items-center space-x-2 mt-6">
        <Input
          type="text"
          placeholder="Search by company name"
          className="max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          Register new company
        </Button>
      </div>

      {/* registered companies table */}
      <RegisteredCompanies filter={filter} />
    </div>
  );
};

export default Companies;
