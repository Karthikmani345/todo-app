import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./container/Login";
import Register from "./container/Register";
import RouteGuard from "./shared/RouteGuard";

const Todo = lazy(() => import("./pages/Todo"));
const Bucket = lazy(() => import("./pages/Bucket"));

const Routes = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<h1>loading lazy component</h1>}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <RouteGuard path="/todo" component={Todo} />
          <RouteGuard path="/bucket" component={Bucket} />
          <RouteGuard exact path="/" render={() => <h1> Home Page</h1>} />
          <Route render={() => <h1> 404 :Page not found</h1>} />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

export default Routes;
