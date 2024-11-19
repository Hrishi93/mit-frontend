import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Import the CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editUser, setEditUser] = useState({});

  // Fetch users from the database when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5008/getusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setEditUser({ name: user.name, password: user.password, mail: user.mail });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5008/updateuser/${editId}`, editUser);
      alert('User updated successfully');
      setEditId(null);
      fetchUsers();
    } catch (error) {
      alert('Error updating user');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/deleteuser/${id}`);
      alert('User deleted successfully');
      fetchUsers();
    } catch (error) {
      alert('Error deleting user');
      console.error(error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user._id} className="user-card">
          {editId === user._id ? (
            <div className="edit-user">
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <input
                type="password"
                value={editUser.password}
                onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              />
              <input
                type="email"
                value={editUser.mail}
                onChange={(e) => setEditUser({ ...editUser, mail: e.target.value })}
              />
              <button onClick={handleSave} className="save-btn">Save</button>
            </div>
          ) : (
            <div className="user-info">
              <p>Name: {user.name}</p>
              <p>Email: {user.mail}</p>
              <div className="user-actions">
                <button onClick={() => handleEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;
