import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProjectFormPage from "./components/ProjectForm";
import ProjectDetails from "./components/ProjectDetails";
import Projects from "./components/Projects";
import MyProjects from "./components/MyProjectsPage";
import MyBackedProjects from "./components/MyBackedProjects";
import EditProject from "./components/EditProject";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Projects />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/new-project">
            <ProjectFormPage />
          </Route>
          <Route path="/edit-project/:projectId">
            <EditProject />
          </Route>
          <Route path="/projects/:projectId">
            <ProjectDetails />
          </Route>
          <Route path="/my-projects">
            <MyProjects />
          </Route>
          <Route path="/users/current/backed-projects">
            <MyBackedProjects />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
