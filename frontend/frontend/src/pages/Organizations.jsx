import React, { useEffect, useState } from "react";
import OrganizationTable from "../components/OrganizationTable.jsx";
import OrganizationForm from "../components/OrganizationForm.jsx";
import {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
} from "../api/api.js";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchOrganizations();
      setOrganizations(res.data || []);
    } catch (err) {
      console.error("Failed to load organizations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = () => {
    setEditingOrg(null);
    setShowForm(true);
  };

  const handleEdit = (org) => {
    setEditingOrg(org);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (slug) => {
    try {
      await deleteOrganization(slug);
      await load();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Check server console.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingOrg) {
        await updateOrganization(editingOrg.slug, formData);
      } else {
        await createOrganization(formData);
      }
      setShowForm(false);
      setEditingOrg(null);
      await load();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Organizations</h2>
        <button className="btn btn-success" onClick={handleAdd}>Add Organization</button>
      </div>

      {showForm && (
        <OrganizationForm
          initialData={editingOrg}
          onCancel={() => { setShowForm(false); setEditingOrg(null); }}
          onSubmit={handleSubmit}
        />
      )}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <OrganizationTable organizations={organizations} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
