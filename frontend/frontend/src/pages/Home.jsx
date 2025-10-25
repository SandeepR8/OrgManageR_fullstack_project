import React from "react";

export default function Home() {
  return (
    <div>
      <h2>Welcome to OrgManageR</h2>
      <p className="lead">Manage Organizations and Users. Use the sidebar to navigate.</p>
      <div className="card">
        <div className="card-body">
          <p>Quick tips:</p>
          <ul>
            <li>Click an organization name to view details and related users.</li>
            <li>Use Add buttons to create organizations and users.</li>
            <li>If adding a coordinator fails, the backend will return an error showing max allowed coordinators.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
