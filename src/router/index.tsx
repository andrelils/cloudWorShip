import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import routes from "./routerConfig";
import { ErrorPage } from "../components";
import { commonConfig } from "../shared/config/";

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props: any) => <route.component {...props} />}
    />
  );
}

function PrivateRoute(): React.ReactElement {
  // if (sessionStorage.getItem("login_flag") === "true") {
  return (
    <Switch>
      <Redirect
        sensitive={true}
        exact={true}
        from={commonConfig.routeBasePath + "/"}
        to={commonConfig.routeBasePath + "/home"}
      />
      {routes.map((item, index) => {
        return <RouteWithSubRoutes key={index} {...item} />;
      })}
      <Route path="*">
        <ErrorPage type="404" title={"404"} />
      </Route>
    </Switch>
  );
  // } else {
  //   return <></>;
  // }
}

function RouterMap(): React.ReactElement {
  return (
    <Router>
      <Switch>
        <Redirect
          sensitive={true}
          exact={true}
          from="/"
          to={commonConfig.routeBasePath + "/home"}
        />
        <Route path={commonConfig.routeBasePath + "/*"}>
          <PrivateRoute />
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterMap;
