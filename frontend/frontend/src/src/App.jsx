import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout.jsx";
import Home from "./pages/Home.jsx";
import Organizations from "./pages/Organizations.jsx";
import OrganizationDetailPage from "./pages/OrganizationDetailPage.jsx";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:slug" element={<OrganizationDetailPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}
