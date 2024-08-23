import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/jobs/getJobs", {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);
};

export default useGetAllJobs;
