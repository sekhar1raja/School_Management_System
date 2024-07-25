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
    section: "",
    coursesOffered: {
        courseOfferedId: ""
    },
    fees: "",
    semester:"",
  });

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
                  <form>
                    <div className="mb-4">
                      <div className="d-flex justify-content-around align-items-center">
                        <h4 style={{ color: '#525F7F', fontWeight: 'bolder' }}>Personal Information</h4>
                        <button type="submit" className="btn btn-success m-3">Edit Profile</button>
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
                        <input type="password" className="form-control shadow-sm" id="password" value={formData.password} name="password" onChange={handleChange} required />
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
                        <div className="col-md-3 mb-3">
                          <label htmlFor="postal_code" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Zip Code</label>
                          <input type="text" className="form-control shadow-sm" id="postal_code" value={formData.postal_code} name="postal_code" onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide a zip code.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="country" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Country</label>
                          <input type="text" className="form-control shadow-sm" id="country" value={formData.country} name="country" onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide a country.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="section.sectionId" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Section</label>
                        <input type="text" className="form-control shadow-sm" id="section" name="section" value={formData.section} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide a section.
                        </div>
                      </div>
                      <div className="col-md-12 mb-3 d-flex row">
                        <div className="col-md-4">
                          <label htmlFor="fees" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Fees</label>
                          <input type="text" className="form-control shadow-sm" id="fees" name="fees" value={formData.fees} onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide the fees.
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="coursesOffered.courseOfferedId" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Course Details</label>
                          <input type="text" className="form-control shadow-sm" id="coursesOffered.courseOfferedId" name="coursesOffered.courseOfferedId" value={formData.coursesOffered.courseName} onChange={handleChange} required />
                          <div className="invalid-feedback">
                            Please provide the course details.
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="aboutMe" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>About Me</label>
                        <textarea className="form-control shadow-sm" id="aboutMe" name="aboutMe" rows="3" value={formData.aboutMe} onChange={handleChange} required></textarea>
                        <div className="invalid-feedback">
                          Please tell us about yourself.
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-success m-3">Update</button>
                      <button type="button" className="btn btn-danger m-3">Cancel</button>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <div className="card text-center shadow-sm">
                    <div className="card-body flex-column">
                      <img src="https://via.placeholder.com/150" className="card-img-top rounded-circle mb-3" alt="Profile" />
                      <h5 className="card-title">{formData.firstName} {formData.lastName}</h5>
                      <p className="card-text">
                        <strong>Email:</strong> {formData.email}<br />
                        <strong>Contact Number:</strong> {formData.contactNumber}
                      </p>
                      {/* <button className="btn btn-primary">Update Photo</button> */}
                    </div>
                    <div className="card-body flex-column">
                      <p className="card-text">About Me</p>
                      <button className="btn btn-primary">Update Photo</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
