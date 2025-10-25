import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // <<-- change this if your backend runs elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Organizations
export const fetchOrganizations = () => API.get("/organizations/");
export const fetchOrganization = (slug) => API.get(`/organizations/${slug}/`);
export const createOrganization = (data) => API.post("/organizations/", data);
export const updateOrganization = (slug, data) => API.put(`/organizations/${slug}/`, data);
export const deleteOrganization = (slug) => API.delete(`/organizations/${slug}/`);

// Users
export const fetchUsers = () => API.get("/users/");
export const createUser = (data) => API.post("/users/", data);
export const updateUser = (id, data) => API.put(`/users/${id}/`, data);
export const deleteUser = (id) => API.delete(`/users/${id}/`);

export default API;
