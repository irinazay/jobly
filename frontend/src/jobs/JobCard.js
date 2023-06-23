import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import './JobCard.css'
/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

useEffect(function () { 
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
      <div className="JobCard card"> {applied}
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
          </div>

       
        </div>
      </div>
  );
}

/** Render integer salary */

function formatSalary(salary) {
return salary.toLocaleString()
}


export default JobCard;




