// src/components/admin/Users.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/admin-theme.css";

export default function Users() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [normalUsers, setNormalUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("ADMIN");

  const API_URL_BASE = (
    import.meta.env.VITE_API_URL || "http://localhost:5000"
  ).replace(/\/+$/, "");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("vitalimes_token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const usersRes = await axios.get(`${API_URL_BASE}/api/auth/users`, {
        headers,
      });

      if (!usersRes.data?.success) {
        throw new Error(usersRes.data?.message || "Users API failed");
      }

      const allUsers = usersRes.data.users || [];

      const admins = allUsers.filter(
        (u) => u.role === "ADMIN" || u.role === "STAFF"
      );
      const normals = allUsers.filter((u) => !u.role || u.role === "USER");

      setAdminUsers(admins);
      setNormalUsers(normals);
    } catch (err) {
      console.error("USERS LOAD ERROR:", err);
      setErrorMsg("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ Add Role modal handlers ------------------ */

  const openAddRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRole("ADMIN"); // default role in dropdown
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSelectedRole("ADMIN");
  };

  const confirmAddRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      const token = localStorage.getItem("vitalimes_token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${API_URL_BASE}/api/auth/add-role`,
        {
          id: selectedUser.id,
          role: selectedRole, // "ADMIN" (or STAFF later)
        },
        { headers }
      );

      if (!res.data?.success) {
        alert(res.data?.message || "Failed to update role");
        return;
      }

      closeModal();
      loadData();
    } catch (err) {
      console.error("ADD ROLE ERROR:", err);
      alert("Error while adding role.");
    }
  };

  const handleRemoveAdmin = async (user) => {
    if (
      !window.confirm(
        `Remove admin access for ${user.email}? They will become a normal user.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("vitalimes_token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(
        `${API_URL_BASE}/api/auth/remove-role`,
        { id: user.id },
        { headers }
      );

      if (!res.data?.success) {
        alert(res.data?.message || "Failed to remove admin access");
        return;
      }

      loadData();
    } catch (err) {
      console.error("REMOVE ROLE ERROR:", err);
      alert("Error while removing admin access.");
    }
  };

  const renderRoleBadge = (role) => {
    if (role === "ADMIN") {
      return (
        <span className="badge rounded-pill bg-success text-white">admin</span>
      );
    }
    if (role === "STAFF") {
      return (
        <span className="badge rounded-pill bg-primary text-white">staff</span>
      );
    }
    return (
      <span className="badge rounded-pill bg-light text-dark">customer</span>
    );
  };

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-1">User Management</h2>
      <p className="text-muted mb-4">
        View all users and manage their roles (Admin / Staff / Customer).
      </p>

      {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

      {loading && !errorMsg && (
        <div className="alert alert-info py-2 mb-3">Loading users...</div>
      )}

      {/* ---------------- Admin & Staff Accounts ---------------- */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Admin &amp; Staff Accounts</h5>
          <small className="text-muted">
            Only these users can access the admin dashboard. Use{" "}
            <strong>Add Role</strong> to give admin access and{" "}
            <strong>Remove Access</strong> to revoke it.
          </small>
        </div>

        <div className="card-body p-0">
          <table className="table mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "35%" }}>Email</th>
                <th style={{ width: "25%" }}>Full Name</th>
                <th style={{ width: "15%" }}>Roles</th>
                <th style={{ width: "25%" }} className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No admin accounts found.
                  </td>
                </tr>
              )}

              {adminUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.name || "-"}</td>
                  <td>{renderRoleBadge(u.role)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => openAddRoleModal(u)}
                    >
                      <i className="bi bi-person-plus me-1" />
                      Add Role
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveAdmin(u)}
                    >
                      <i className="bi bi-shield-x me-1" />
                      Remove Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- Normal Users (signed up users) ---------------- */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">Users</h5>
          <small className="text-muted">
            These accounts can log in to Vitalimes as customers. Use{" "}
            <strong>Add Role</strong> to give them admin access.
          </small>
        </div>

        <div className="card-body p-0">
          <table className="table mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "35%" }}>Email</th>
                <th style={{ width: "25%" }}>Full Name</th>
                <th style={{ width: "15%" }}>Roles</th>
                <th style={{ width: "25%" }} className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {normalUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No users found.
                  </td>
                </tr>
              )}

              {normalUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.name || "-"}</td>
                  <td>{renderRoleBadge(u.role)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openAddRoleModal(u)}
                    >
                      <i className="bi bi-person-plus me-1" />
                      Add Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- Add Role Modal ---------------- */}
      {showModal && selectedUser && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Role</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <p className="mb-3">
                  Select a role to grant to{" "}
                  <strong>{selectedUser.email}</strong>
                </p>

                <div className="mb-3">
                  <label className="form-label">Select a role</label>
                  <select
                    className="form-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Select a role</option>
                    <option value="ADMIN">Admin</option>
                    {/* Enable STAFF later if you want */}
                    {/* <option value="STAFF">Staff</option> */}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={confirmAddRole}
                  disabled={!selectedRole}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
