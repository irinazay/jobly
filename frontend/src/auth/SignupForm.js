import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);

    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Sign Up</h3>
        {formErrors && formErrors.length > 0 && (
          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
              color: "#dc3545",
            }}
          >
            {formErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2" style={{ marginTop: "40px" }}>
                <button
                  type="submit"
                  className="btn btn-primary auth"
                  onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
