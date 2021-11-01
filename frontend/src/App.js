
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./nav/NavBar";
import Routes from "./routes/Routes";
import JoblyApi from "./api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";

function App() {
  const [isLoaded, setisLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);

  useEffect(function () {

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(currentUser.applications);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setisLoaded(true);
    }
    setisLoaded(false);
    getCurrentUser();
  }, [token]);

    if (!isLoaded) {
      return <p>Loading &hellip;</p>;
    }
    
    function logout() {
      setCurrentUser(null);
      setToken(null);
    }

    async function signup(signupData) {
      try {
        let token = await JoblyApi.signup(signupData);
        setToken(token);
        return { success: true };
      } catch (errors) {
        return { success: false, errors };
      }
    }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
   async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {

    return applicationIds.includes(id);
  }


    /** Apply to a job: make API call and update set of application IDs. */
    function applyToJob(id) {
      if (hasAppliedToJob(id)) return;
      JoblyApi.applyToJob(currentUser.username, id);
      setApplicationIds(ids => ([...ids, id]));
      
    }


  return (

    
      <UserContext.Provider
            value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob, applicationIds}}>
          <div className="App">
            <NavBar logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>

  );
}

export default App;
