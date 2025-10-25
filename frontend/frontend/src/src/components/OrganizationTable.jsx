import React from "react";
import { Link } from "react-router-dom";

export default function OrganizationTable({ organizations = [], onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr>
            <th>Organization Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th style={{width: "150px"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {organizations.length === 0 && (
            <tr><td colSpan="4" className="text-center">No organizations found</td></tr>
          )}
          {organizations.map(org => (
            <tr key={org.id}>
              <td>
                <Link to={`/organizations/${org.slug}`} className="text-decoration-none">
                  {org.Organization_name}
                </Link>
              </td>
              <td>{org.slug}</td>
              <td>{org.status}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(org)}>Edit</button>

                <button
                  className="btn btn-sm btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteOrgModal${org.id}`}
                >
                  Delete
                </button>

                {/* Delete modal */}
                <div className="modal fade" id={`deleteOrgModal${org.id}`} tabIndex="-1" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete <strong>{org.Organization_name}</strong>?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => onDelete(org.slug)}>Delete</button>
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
