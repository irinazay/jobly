import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import JobCard from "./JobCard";


/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(function () {
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <p>Loading &hellip;</p>;

  return (
      <div className="JobList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {jobs.length
            ? jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default JobList;
