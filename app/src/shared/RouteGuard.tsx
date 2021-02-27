import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../store/Store";

const RouteGuard = ({ component: Component, ...rest }: any) => {
  const authState = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return true ? (
          authState.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname },
              }}
            />
          )
        ) : (
          <h1>loading route please wait ...</h1>
        );
      }}
    />
  );
};

export default RouteGuard;
