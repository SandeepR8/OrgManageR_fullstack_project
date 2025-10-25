import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable.jsx";
import UserForm from "../components/UserForm.jsx";
import {
  fetchUsers,
  fetchOrganizations,
  createUser,
  updateUser,
  deleteUser
} from "../api/api.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [uRes, oRes] = await Promise.all([fetchUsers(), fetchOrganizations()]);
      setUsers(uRes.data || []);
      setOrganizations(oRes.data || []);
    } catch (err) {
      console.error("Failed to load users/orgs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await load();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. See console.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      setShowForm(false);
      setEditingUser(null);
      await load();
    } catch (err) {
      // rethrow to form to show errors
      throw err;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Users</h2>
        <button className="btn btn-success" onClick={handleAdd}>Add User</button>
      </div>

      {showForm && (
        <UserForm
          organizations={organizations}
          initialData={editingUser}
          onCancel={() => { setShowForm(false); setEditingUser(null); }}
          onSubmit={handleSubmit}
        />
      )}

      {loading ? <div>Loading...</div> : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
