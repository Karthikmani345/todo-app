import * as React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { unSetAuth } from "../store/Action";
import { terminateState } from "../shared/core/LocalStorage";

interface ILayoutProps {}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  const dispact = useDispatch();

  const logout = () => {
    dispact(unSetAuth());
    terminateState();
  };

  return (
    <>
      {/* Header section */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={{ pathname: "/bucket" }}
              >
                {" "}
                Bucket <span className="sr-only">(current)</span>{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={{ pathname: "/todo" }}
              >
                {" "}
                Todo <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                Logout <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Header section */}
      {children}
    </>
  );
};

export default Layout;
