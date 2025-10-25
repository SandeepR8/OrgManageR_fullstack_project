import React, { useState, useEffect } from "react";

export default function OrganizationForm({ initialData = null, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    Organization_name: "",
    email: "",
    phone_number: "",
    website: "",
    language: "EN",
    status: "ACTIVE",
    address: "",
    max_coordinators: 5,
  });
  const [errors, setErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      // Map server fields if necessary
      setForm({
        Organization_name: initialData.Organization_name || "",
        email: initialData.email || "",
        phone_number: initialData.phone_number || "",
        website: initialData.website || "",
        language: initialData.language || "EN",
        status: initialData.status || "ACTIVE",
        address: initialData.address || "",
        max_coordinators: initialData.max_coordinators ?? 5,
      });
    }
  }, [initialData]);

  const change = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);
    try {
      await onSubmit(form);
    } catch (err) {
      // Normalize axios error shape
      const server = err?.response?.data;
      if (server) {
        // server can be object or string
        setErrors(server);
      } else {
        setErrors({ non_field_errors: ["Unknown error"] });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{initialData ? "Edit Organization" : "Add Organization"}</h5>

        {errors && (
          <div className="alert alert-danger">
            <pre style={{margin:0,whiteSpace:"pre-wrap"}}>{JSON.stringify(errors, null, 2)}</pre>
          </div>
        )}

        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Organization Name</label>
              <input name="Organization_name" value={form.Organization_name} onChange={change} required className="form-control" />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">Email</label>
              <input name="email" type="email" value={form.email} onChange={change} required className="form-control" />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Phone</label>
              <input name="phone_number" value={form.phone_number} onChange={change} className="form-control" required />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Website</label>
              <input name="website" value={form.website} onChange={change} className="form-control" />
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Language</label>
              <select name="language" value={form.language} onChange={change} className="form-select">
                <option value="EN">English</option>
                <option value="FR">French</option>
                <option value="HI">Hindi</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
              </select>
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Status</label>
              <select name="status" value={form.status} onChange={change} className="form-select">
                <option value="ACTIVE">Active</option>
                <option value="BLOCK">Block</option>
                <option value="IN-ACTIVE">In-Active</option>
              </select>
            </div>

            <div className="col-md-4 mb-2">
              <label className="form-label">Max Coordinators</label>
              <input name="max_coordinators" type="number" min="0" value={form.max_coordinators} onChange={change} className="form-control" />
            </div>

            <div className="col-12 mb-2">
              <label className="form-label">Address</label>
              <textarea name="address" value={form.address} onChange={change} className="form-control" rows="2" />
            </div>
          </div>

          <div className="mt-3">
            <button className="btn btn-success me-2" disabled={submitting} type="submit">
              {submitting ? "Saving..." : "Save"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
