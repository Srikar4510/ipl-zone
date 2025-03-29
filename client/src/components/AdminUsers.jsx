import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: { 'x-auth-token': token }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error(err.response ? err.response.data : err.message));
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = async (userId) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/user/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        fetchUsers();
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="admin-users-container">
    <h2>All Users</h2>
    <table className="admin-users-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.email}>
           <td className="admin-email">{u.email}</td>
            <td>{u.username}</td>
            <td>{u.role}</td>
            <td>
              <button
                onClick={() => deleteUser(u._id)}
                className="admin-delete-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default AdminUsers;
