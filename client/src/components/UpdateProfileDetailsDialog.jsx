import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const UpdateProfileDetailsDialog = ({ open, setOpen }) => {
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phone: user?.phone,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills,
    file: null,
  });

  function handleOnChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.files["0"],
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      dispatch(setLoading(true));

      const formData = new FormData();
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.put(
        "http://localhost:3000/user/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred."
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="max-h-[100%]"
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <form className="w-full mx-auto py-2" onSubmit={handleSubmit}>
              <div className="mb-5 flex items-center gap-2">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={data.fullname}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5 flex items-center gap-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-5 flex items-center gap-2">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5 flex items-center gap-2">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bio
                </label>
                <input
                  type="bio"
                  id="bio"
                  name="bio"
                  value={data.bio}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5 flex items-center gap-2">
                <label
                  htmlFor="skills"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Skills
                </label>
                <input
                  type="skills"
                  id="skills"
                  name="skills"
                  value={data.skills}
                  onChange={handleOnChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-5 flex items-center gap-2">
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Resume
                </label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer"
                />
              </div>
              {loading ? (
                <button
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg min-w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 justify-center items-center"
                >
                  <Loader2 className="animate-spin" /> Updating
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg min-w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              )}
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDetailsDialog;
