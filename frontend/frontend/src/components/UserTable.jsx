import React from "react";

export default function UserTable({ users = [], onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Organization</th>
            <th>Role</th>
            <th style={{width:"140px"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && <tr><td colSpan="4" className="text-center">No users found</td></tr>}
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.organization_name || (user.organization && user.organization.Organization_name) || "—"}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(user)}>Edit</button>
                <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteUserModal${user.id}`}>Delete</button>

                <div className="modal fade" id={`deleteUserModal${user.id}`} tabIndex="-1" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete <strong>{user.name}</strong>?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => onDelete(user.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
