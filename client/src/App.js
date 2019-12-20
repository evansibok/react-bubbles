import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

import "./styles.scss";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";

function App() {
  return (
      <div className="App">
        <Route exact path="/" component={Login} />

        <PrivateRoute
          path="/bubbles"
          component={BubblePage}
        />
      </div>
  );
}

const PrivateRoute = ({ component: Component, props }) => (
  <Route
    {...props}
    render={props => localStorage.getItem("token") ? (<Component {...props} />) : (<Redirect to="/" />)}
  />
)
export default withRouter(App);
