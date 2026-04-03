import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = ({ user, onNavigate, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    gender: user?.gender || '',
    medicalHistory: user?.medicalHistory || ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    onUpdateProfile({
      ...user,
      ...formData
    });
    
    setSuccessMessage('Profile updated successfully!');
    setIsEditing(false);
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || '',
      gender: user?.gender || '',
      medicalHistory: user?.medicalHistory || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => onNavigate('dashboard')}>
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>My Profile</h1>
        </div>
      </header>

      <div className="profile-content">
        {successMessage && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i> {successMessage}
          </div>
        )}

        <div className="profile-card">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>

          {!isEditing ? (
            <div className="profile-view">
              <div className="info-group">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>

              <div className="info-group">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>

              <div className="info-row">
                <div className="info-group">
                  <label>Age</label>
                  <p>{user?.age || 'Not specified'}</p>
                </div>

                <div className="info-group">
                  <label>Gender</label>
                  <p>{user?.gender || 'Not specified'}</p>
                </div>
              </div>

              <div className="info-group">
                <label>Medical History</label>
                <p>{user?.medicalHistory || 'None'}</p>
              </div>

              <div className="info-group">
                <label>Member Since</label>
                <p>{user?.joinDate}</p>
              </div>

              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="profile-edit">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="medicalHistory">Medical History</label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="button-group">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
