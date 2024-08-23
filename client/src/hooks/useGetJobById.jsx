import { useState, useEffect } from "react";
import axios from "axios";

const useGetJobById = (jobId) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/jobs/get/${jobId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setJob(response.data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [jobId]);

  return job;
};

export default useGetJobById;
