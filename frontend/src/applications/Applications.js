import React, { useContext, useState, useEffect } from "react";
import JobCard from "../jobs/JobCard";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api";

function Applications() {
  const { applicationIds } = useContext(UserContext);
  const [jobs, setJobs] = useState(null);

  useEffect(function() {
    async function getJob() {
      try {
        if (applicationIds.length) {
          let result = applicationIds.map((id) => JoblyApi.getJob(id));
          let appliedJobs = await Promise.all(result);

          setJobs(appliedJobs);
        }
      } catch (err) {
        console.log({ err });
      }
    }
    getJob();
  }, []);

  if (!jobs)
    return (
      <div style={{ fontSize: "2rem", marginLeft: "15px" }}>
        No applications
      </div>
    );

  return (
    <div className="JobList col-md-8 offset-md-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
        />
      ))}
    </div>
  );
}

export default Applications;
