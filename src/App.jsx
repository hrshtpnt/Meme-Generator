import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import StepOne from "./Components/StepOne/StepOne";
import StepTwo from "./Components/StepTwo/StepTwo";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <div className="container-fluid margin-top-50">
            <div className="modal-body row">
              <Redirect exact from="/" to="/stepOne" />
              <Route path={"/stepOne"} component={StepOne} />
              <Route path={"/stepTwo"} component={StepTwo} />
            </div>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
