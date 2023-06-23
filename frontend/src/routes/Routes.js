import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetails from "../companies/CompanyDetails";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import UserContext from "../auth/UserContext";
import PageNotFound from "../404/PageNotFound";
import Applications from "../applications/Applications";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/companies">
          {currentUser ? <CompanyList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/jobs">
          {currentUser ? <JobList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/companies/:handle">
          {currentUser ? <CompanyDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/applications">
          {currentUser ? <Applications /> : <Redirect to="/login" />}
        </Route>

        <PageNotFound />
      </Switch>
    </div>
  );
}

export default Routes;
