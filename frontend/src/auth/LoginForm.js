import React, { useState } from "react";
import { useHistory } from "react-router-dom";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
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
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
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
                  autoComplete="current-password"
                  required
                />
              </div>
              <div className="d-grid gap-2" style={{ marginTop: "40px" }}>
                <button
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

export default LoginForm;
