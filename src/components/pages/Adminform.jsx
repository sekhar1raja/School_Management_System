import React, { useState } from 'react';

const AdminForm = () => {
  const [role, setRole] = useState('teacher'); // Default role
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    examiner: '',
    gender: '',
    role: '',
    contactNumber: '',
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    country: '',
    aboutMe: '',
    salary: '',
    fee: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 col-md-4">
          <label htmlFor="role" className="form-label" style={{ color: '#525F7F' }}>Role</label>
          <select className="form-control shadow-sm" id="role" name="role" value={role} onChange={handleRoleChange} required>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        
        {/* Common Fields */}
        <div className='row col-md-6'>
        <div className=" mb-4">
          <h4 style={{ color: '#525F7F' }}>Personal Information</h4>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>First Name</label>
            <input type="text" className="form-control shadow-sm" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <div className="invalid-feedback">
              Please provide a first name.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Last Name</label>
            <input type="text" className="form-control shadow-sm" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <div className="invalid-feedback">
              Please provide a last name.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Password</label>
            <input type="password" className="form-control shadow-sm" id="password" name="password" value={formData.password} onChange={handleChange} required />
            <div className="invalid-feedback">
              Please provide a password.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Email</label>
            <input type="email" className="form-control shadow-sm" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <div className="invalid-feedback">
              Please provide an email.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Gender</label>
            <select className="form-control shadow-sm" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="invalid-feedback">
              Please select a gender.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Contact Number</label>
            <input type="tel" className="form-control shadow-sm" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
            <div className="invalid-feedback">
              Please provide a contact number.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Role</label>
            <input type="text" className="form-control shadow-sm" id="role" name="role" value={formData.role} onChange={handleChange} required />
            <div className="invalid-feedback">
              Please provide a role.
            </div>
          </div>
        </div>
        </div>
        
        {role === 'teacher' && (
          <div className="mb-3 col-md-6">
            <label htmlFor="salary" className="form-label d-flex" style={{ color: '#525F7F' }}>Salary</label>
            <input type="number" className="form-control shadow-sm" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
          </div>
        )}
        {role === 'student' && (
          <div className="mb-3 col-md-6">
            <label htmlFor="fee" className="form-label d-flex" style={{ color: '#525F7F' }}>Fee</label>
            <input type="number" className="form-control shadow-sm" id="fee" name="fee" value={formData.fee} onChange={handleChange} required />
          </div>
        )}
        
        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-success m-3">Submit</button>
          <button type="button" className="btn btn-danger m-3">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
