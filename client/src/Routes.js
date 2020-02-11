import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from './containers/Signup';
import PrivateRoute from './containers/PrivateRoute'
import CleverDoc from './containers/Cleverdoc';
import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/home" exact component={CleverDoc} />
      <Route component={NotFound} />
    </Switch>
  );
}
