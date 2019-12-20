import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, props }) => (
  <Route
    {...props}
    render={props => localStorage.getItem("token") ? (<Component {...props} />) : (<Redirect to="/" />)}
  />
)
export default App;
