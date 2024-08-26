import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.files[0],
    });
  };

  const registerNewCompany = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("location", input.location);
      formData.append("description", input.description);
      formData.append("file", input.file);

      const response = await axios.post(
        "http://localhost:3000/company/registerCompany",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/admin/companies");
      } else {
        toast.error(response?.data?.message || "Something went wrong");
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
      <form className="flex flex-col gap-4" onSubmit={registerNewCompany}>
        <div className="font-bold text-3xl">Register a new company</div>
        <hr />
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="name" className="font-semibold cursor-pointer">
              Name
            </Label>
            <Input
              name="name"
              id="name"
              className="max-w-xs"
              value={input.name}
              placeholder="Google, Justpay, ..."
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
            placeholder="Enter description about purpose of company"
            onChange={handleInputChange}
            required
            value={input.description}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="logo" className="font-semibold cursor-pointer">
            Company Logo
          </Label>
          <Input
            type="file"
            name="file"
            id="logo"
            onChange={handleFileChange}
            required
          />
        </div>
        <Button className="mt-2 w-fit">
          {loading ? (
            <span className="flex gap-1 items-center">
              <Loader2Icon className="animate-spin" />
              <span>Doing paperwork</span>
            </span>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateCompany;
