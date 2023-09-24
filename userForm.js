import React, { useState, useEffect } from 'react';
import './userForm.css';
import axios from 'axios';
const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', age: '', address: '' });
  const [userData, setUserData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user');
      console.log(response.data,'fetch');
      if (response.data.user) {
        setUserData(response?.data?.user);
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleEdit = (id) => {
    setEditingId(id);
    const userToEdit = userData.find((user) => user._id === id);
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        age: userToEdit.age,
        address: userToEdit.address,
      });
    }
  };
  const handleCancelEdit = () => {
    setFormData({ name: '', age: '', address: '' });
    setEditingId(null);
  };
  const handleSaveEdit = async () => {
    // Placeholder: Implement this function to save the edited user data
    console.log('Saving edited user data...');
  };
  const handleDelete = async (id) => {
    // Placeholder: Implement this function to delete a user
    console.log('Deleting user with ID:', id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User data submitted successfully!');
        fetchUserData();
      } else {
        console.error('Error submitting user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setFormData({ name: '',age: '',address:''});
  };
      
        
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.address}</td>
          <td>
            {editingId === user._id ? (
              <div className="form-actions">
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="form-actions">
                <button onClick={() => handleEdit(user._id)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            )}
          </td>
        </tr>
  return (
    <div className="user-form-container">
      <h2>Add a User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>User Details</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>  );
};
export default UserForm;
