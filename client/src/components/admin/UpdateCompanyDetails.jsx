import useGetCompanyById from "@/hooks/useGetCompanyById";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

const UpdateCompanyDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { company } = useGetCompanyById(id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    file: null,
    website: "",
  });

  useEffect(() => {
    setInput({
      ...input,
      name: company.name || "",
      description: company.description || "",
      location: company.location || "",
      website: company.website || "",
    });
  }, [company]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target?.files[0],
    });
  };

  const updateCompanyDetails = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const formData = new FormData();
      if (input.name) formData.append("name", input.name);
      if (input.location) formData.append("location", input.location);
      if (input.description) formData.append("description", input.description);
      if (input.file) formData.append("file", input.file);
      if (input.website) formData.append("website", input.website);

      const response = await axios.put(
        `http://localhost:3000/company/update/${id}`,
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
      <form className="flex flex-col gap-4" onSubmit={updateCompanyDetails}>
        <div className="font-bold text-3xl">Edit your company details</div>
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
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="website" className="font-semibold cursor-pointer">
              Website URL
            </Label>
            <Input
              name="website"
              id="website"
              onChange={handleInputChange}
              placeholder="www.xyz.com, www.abc.in, ..."
              value={input.website}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="logo" className="font-semibold cursor-pointer">
              Company Logo
            </Label>
            <Input
              type="file"
              name="file"
              id="logo"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <Button className="mt-2 w-fit">
          {loading ? (
            <span className="flex gap-1 items-center">
              <Loader2Icon className="animate-spin" />
              <span>Doing paperwork</span>
            </span>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateCompanyDetails;
