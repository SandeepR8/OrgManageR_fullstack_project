import React, { useState, useEffect } from "react";

export default function UserForm({ organizations = [], initialData = null, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    role: "COORDINATOR",
    organization: "",
  });
  const [errors, setErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        role: initialData.role || "COORDINATOR",
        organization: initialData.organization || (initialData.organization?.id ?? ""),
      });
    } else if (organizations.length > 0 && !form.organization) {
      setForm(prev => ({ ...prev, organization: organizations[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, organizations]);

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
      const server = err?.response?.data;
      if (server) setErrors(server);
      else setErrors({ non_field_errors: ["Unknown error"] });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{initialData ? "Edit User" : "Add User"}</h5>

        {errors && (
          <div className="alert alert-danger">
            <pre style={{margin:0,whiteSpace:"pre-wrap"}}>{JSON.stringify(errors, null, 2)}</pre>
          </div>
        )}

        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Name</label>
              <input name="name" value={form.name} onChange={change} required className="form-control" />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Role</label>
              <select name="role" value={form.role} onChange={change} className="form-select">
                <option value="ADMIN">Admin</option>
                <option value="COORDINATOR">Coordinator</option>
              </select>
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Organization</label>
              <select name="organization" value={form.organization} onChange={change} className="form-select" required>
                <option value="">-- Select Organization --</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.Organization_name}</option>
                ))}
              </select>
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
