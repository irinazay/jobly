import React, { useState } from "react";
import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {

  const [searchTerm, setSearchTerm] = useState("");


  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div className="SearchForm mb-4">
        <form className="form-inline" onSubmit={handleSubmit}>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end"> 
          <input
              className="form-control form-control-lg flex-grow-1"
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}
          />       
          <button type="submit" className="btn btn-lg btn-primary">
            Submit
          </button>
          </div>

        </form>
      </div>
  );
}

export default SearchForm;
