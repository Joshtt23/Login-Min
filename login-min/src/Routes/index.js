import React from "react";
import { Switch, Route, BrowserRouter, Router } from "react-router-dom";

//routes
import { publicRoutes } from "./allRoutes";

const Index = () => {
  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const obj = sessionStorage.getItem("authUser");
  return (
    <React.Fragment>
      <BrowserRouter>
          <Route path={availablePublicRoutesPaths}>
              <Switch>
                {publicRoutes.map((route, idx) => (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                    exact={true}
                  />
                ))}
              </Switch>
          </Route>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Index;
