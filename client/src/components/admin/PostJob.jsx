import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    positions: "",
    company: "",
    experience: "",
    applicants: [],
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (companyId) => {
    setInput({
      ...input,
      company: companyId,
    });
  };

  const postJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/jobs/postJob",
        input,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(response?.data?.success){
        toast.success("Job posted");
        navigate("/admin/jobs")
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl border p-5 rounded-xl mt-5 m-auto">
      <form className="flex flex-col gap-4" onSubmit={postJob}>
        <div className="font-bold text-3xl">Post a new job</div>
        <hr />
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="title" className="font-semibold cursor-pointer">
              Title
            </Label>
            <Input
              name="title"
              id="title"
              className="max-w-xs"
              value={input.title}
              placeholder="Job role"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="location" className="font-semibold cursor-pointer">
              Location
            </Label>
            <Input
              name="location"
              id="location"
              className="max-w-xs"
              value={input.location}
              placeholder="Ahmedabad, Hyderabad, ..."
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="font-semibold cursor-pointer">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter brief description about job role"
            onChange={handleInputChange}
            required
            value={input.description}
          />
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label
              htmlFor="requirements"
              className="font-semibold cursor-pointer"
            >
              Requirements
            </Label>
            <Input
              name="requirements"
              id="requirements"
              className="max-w-xs"
              value={input.requirements}
              placeholder="Pre-requisites"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="salary" className="font-semibold cursor-pointer">
              Salary (Number in LPA)
            </Label>
            <Input
              name="salary"
              id="salary"
              className="max-w-xs"
              value={input.salary}
              placeholder="12"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="positions" className="font-semibold cursor-pointer">
              Positions
            </Label>
            <Input
              name="positions"
              id="positions"
              className="max-w-xs"
              value={input.positions}
              placeholder="8"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="jobType" className="font-semibold cursor-pointer">
              Job type
            </Label>
            <Input
              name="jobType"
              id="jobType"
              className="max-w-xs"
              value={input.jobType}
              placeholder="Fulltime, Partime, Hybrid, ...."
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label
              htmlFor="experience"
              className="font-semibold cursor-pointer"
            >
              Experience (In years)
            </Label>
            <Input
              name="experience"
              id="experience"
              className="max-w-xs"
              value={input.experience}
              placeholder="2"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mt-1">
          <Select name="company" onValueChange={handleSelectChange} required>
            <SelectTrigger className="w-[50%]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company, index) => (
                <SelectItem key={index} value={company._id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-2 w-fit">
          {loading ? (
            <span className="flex gap-1 items-center">
              <Loader2Icon className="animate-spin" />
              <span>Printing banners</span>
            </span>
          ) : (
            "Post Job"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
