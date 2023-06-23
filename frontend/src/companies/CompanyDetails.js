import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../404/PageNotFound";
import JoblyApi from "../api";
import JobCard from "../jobs/JobCard";

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(
    function() {
      async function getCompany() {
        try {
          let result = await JoblyApi.getCompany(handle);
          setCompany(result);
        } catch (err) {
          console.log(err);
          setCompany({ err });
        }
      }
      getCompany();
    },
    [handle]
  );

  if (!company) return <p>Loading</p>;

  let { jobs } = company;

  return (
    <div>
      {company.err ? (
        <PageNotFound />
      ) : (
        <div className="CompanyDetail col-md-8 offset-md-2">
          <h4>{company.name}</h4>
          <p>{company.description}</p>
          {company.numEmployees ? (
            <p>{company.numEmployees} employees</p>
          ) : null}

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
      )}
    </div>
  );
}

export default CompanyDetails;
