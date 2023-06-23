import React from "react";
import { Link } from "react-router-dom";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h3>PAGE NOT FOUND</h3>

      <Link to="/">
        <h6>GO TO HOMEPAGE</h6>
      </Link>
    </div>
  );
}

export default PageNotFound;
