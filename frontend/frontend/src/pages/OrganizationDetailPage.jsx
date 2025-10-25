import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrganization, deleteOrganization } from "../api/api.js";
import UserTable from "../components/UserTable.jsx";
import OrganizationForm from "../components/OrganizationForm.jsx";

export default function OrganizationDetailPage() {
  const { slug } = useParams();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchOrganization(slug);
      setOrganization(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [slug]);

  const handleDeleteOrg = async () => {
    if (!window.confirm("Delete this organization?")) return;
    try {
      await deleteOrganization(slug);
      window.location.href = "/organizations";
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed. See console.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!organization) return <div>Organization not found</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h2>{organization.Organization_name}</h2>
          <p className="mb-1"><strong>Slug:</strong> {organization.slug}</p>
          <div className="d-flex align-items-center gap-5">
          <p className="mb-1"><strong>Email:</strong> {organization.email}</p>
          <p className="mb-1"><strong>Phone:</strong> {organization.phone_number}</p></div>
          <strong>Website: </strong>
            <code className="mb-1">
              <a href={`${organization.website}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                {organization.website}
              </a>
            </code>
          <pre className="mb-1 mt-1"><strong>Address:</strong>{organization.address}</pre>
          <p className="mb-1"><strong>Max Coordinators:</strong> {organization.max_coordinators}</p>

        </div>
        <div>
          <Link to="/organizations" className="btn btn-secondary me-2">Back</Link>
          <button className="btn btn-danger" onClick={handleDeleteOrg}>Delete Org</button>
        </div>
      </div>

      <hr />

      <h4>Related Users</h4>
      <UserTable users={organization.users || []} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
