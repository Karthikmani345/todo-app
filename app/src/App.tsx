import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
import Layout from "./pages/Layout";
import Routes from "./Routes";
import { RootState, store } from "./store/Store";

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <>
      <BrowserRouter>
        {authState.isAuthenticated ? (
          <Layout>
            <Routes />
          </Layout>
        ) : (
          <Routes />
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
