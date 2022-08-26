import Layout from "components/Layout";
import Home from "pages/Home";
import React from "react";
import { Switch, Route } from "react-router-dom";
const Routes = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </>
  );
};

export default Routes;
