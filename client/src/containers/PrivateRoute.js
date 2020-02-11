import React from "react";
import API from "../utils/API.js";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (API.isAuth() === false) {
          return <Redirect to="/"/>;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}