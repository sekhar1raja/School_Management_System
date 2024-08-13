import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    gender: "",
    fatherName: "",
    motherName: "",
    alternateNumber: "",
    roles: { id: "" },
    contactNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    section: {   
      sectionId: ""
    },
    coursesOffered: {
      courseOfferedId: ""
    },
    fees: "",
    currentSemester: "",
  });
  const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/150");


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/user/individualUser?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [outer, inner] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [outer]: {
          ...prevState[outer],
          [inner]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageSrc = URL.createObjectURL(file);
      setImageSrc(newImageSrc);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:8080/user/user?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          section: { id: formData.section },
          coursesOffered: { courseOfferedId: formData.coursesOffered.courseOfferedId }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      alert("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
    
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-header text-center text-white" style={{ background: '#F7871B' }}>
              <h2>Student Profile</h2>
            </div>
            <div className="card-body">
              <div className="row" style={{ background: '#F7FAFC' }}>
                <div className="col-md-8">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="d-flex justify-content-around align-items-center">
                        <h4 style={{ color: '#525F7F', fontWeight: 'bolder' }}>Personal Information</h4>
                        <button type="submit" className="btn btn-success m-3">Update Profile</button>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>First Name</label>
                        <input type="text" className="form-control shadow-sm" id="firstName" value={formData.firstName} name="firstName" onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a first name.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Last Name</label>
                        <input type="text" className="form-control shadow-sm" id="lastName" value={formData.lastName} name="lastName" onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a last name.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Password</label>
                        <input type="password" className="form-control shadow-sm" id="password" value={formData.password} name="password" onChange={handleChange} required autoComplete="current-password" />
                        <div className="invalid-feedback">
                          Please provide a password.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Email</label>
                        <input type="email" className="form-control shadow-sm" id="email" value={formData.email} name="email" onChange={handleChange} required />
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
                        <label htmlFor="roles.id" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Role</label>
                        <input type="text" className="form-control shadow-sm" id="roles.id" name="roles.id" value={formData.roles.id} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a role.
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 style={{ color: '#525F7F' }}>Contact Details</h4>
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Contact Number</label>
                        <input type="tel" className="form-control shadow-sm" id="contactNumber" value={formData.contactNumber} name="contactNumber" onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a contact number.
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 style={{ color: '#525F7F' }}>Address</h4>
                      <div className="mb-3">
                        <label htmlFor="address1" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Address</label>
                        <input type="text" className="form-control shadow-sm" id="address1" value={formData.address1} name="address1" onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide an address.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address2" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Address 2</label>
                        <input type="text" className="form-control shadow-sm" id="address2" value={formData.address2} name="address2" onChange={handleChange} />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="city" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>City</label>
                          <input type="text" className="form-control shadow-sm" id="city" name="city" value={formData.city} onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide a city.
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="state" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>State</label>
                          <input type="text" className="form-control shadow-sm" id="state" name="state" value={formData.state} onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide a state.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="postal_code" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Postal Code</label>
                          <input type="text" className="form-control shadow-sm" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide a postal code.
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="country" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Country</label>
                          <input type="text" className="form-control shadow-sm" id="country" name="country" value={formData.country} onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide a country.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 style={{ color: '#525F7F' }}>Academic Details</h4>
                      <div className="mb-3">
                        <label htmlFor="section" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Section</label>
                        <input type="text" className="form-control shadow-sm" id="section" name="section.sectionId" value={formData.section.sectionId} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a section.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="coursesOffered.courseOfferedId" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Course Offered ID</label>
                        <input type="text" className="form-control shadow-sm" id="coursesOffered.courseOfferedId" name="coursesOffered.courseOfferedId" value={formData.coursesOffered.courseOfferedId} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a course offered ID.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fees" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Fees</label>
                        <input type="number" className="form-control shadow-sm" id="fees" name="fees" value={formData.fees} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide fees.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="currentSemester" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Semester</label>
                        <input type="text" className="form-control shadow-sm" id="currentSemester" name="currentSemester" value={formData.currentSemester} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a semester.
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-4 text-center">
                  <img src={imageSrc} alt="Profile" className="img-thumbnail mb-3" width="100px" height="100px" />
                  <div className="mb-3">
                    <label htmlFor="imageUpload" className="form-label">Upload Profile Picture</label>
                    <input
                      className="form-control"
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">&copy; 2024 Student Management System</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
