import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarLayout({ children }) {
  const loc = useLocation();

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">OrgManageR</span>
        </div>
      </nav>

      <div className="sidebar-layout">
        <aside className="sidebar">
          <div className="logo">OrgManageR</div>
          <nav>
            <Link to="/organizations" className="nav-link-light" aria-current={loc.pathname.startsWith("/organizations") ? "page" : undefined}>
              Organizations
            </Link>
            <Link to="/users" className="nav-link-light" aria-current={loc.pathname === "/users" ? "page" : undefined}>
              Users
            </Link>
          </nav>
        </aside>

        <main className="content">
          {children}
        </main>
      </div>
    </>
  );
}
