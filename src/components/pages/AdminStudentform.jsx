import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    gender: "",
    fatherName: "",
    motherName: "",
    alternateNumber: "",
    roles: {
      id: ""
    },
    contactNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    classTable: {
      classId: "",
    },
    section: {
      sectionId: "",
    },

    fees: "",
  });

 
  const [classTable, setClassTable] = useState([]);
  const [sections, setSections] = useState([]);


 // Fetch Class
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch('http://localhost:8080/util/class');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClassTable(data);
      } catch (error) {
        console.error('Failed to fetch Class:', error);
      }
    };
      fetchClass();

  }, []); 

  // Fetch Sections
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch('http://localhost:8080/util/section');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error('Failed to fetch section:', error);
      }
    };
      fetchSection();

  }, []); 


  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // To handle nested state updates correctly
    if (name.includes('.')) {
      const [outer, inner] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [outer]: {
          ...prevState[outer],
          [inner]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8080/user/user';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.log('Success:', data);

      // Clear form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        gender: "",
        fatherName: "",
        motherName: "",
        alternateNumber: "",
        roles: {
          id: ""
        },
        contactNumber: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        classTable: {
          classId: "",
        },
        section: {
          sectionId: "",
        },

        fees: "",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="mb-4">
              <h4 style={{ color: '#525F7F' }}>Add Student  </h4>
            </div>

            <div className="">
              <div className="row" style={{ background: '#F7FAFC' }}>
                <div className="col-md-12">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="d-flex justify-content-around align-items-center">
                        <h4 style={{ color: '#525F7F', fontWeight: 'bolder' }}>Personal Information</h4>
                      </div>

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
                        <label htmlFor="roles.id" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Roles</label>
                        <select className="form-control shadow-sm" id="roles.id" name="roles.id" value={formData.roles.id} onChange={handleChange} required>
                          <option value="">Select Role</option>
                          <option value="3">Teacher</option>
                          <option value="2">Student</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a role.
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
                        <label htmlFor="fatherName" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Father Name</label>
                        <input type="text" className="form-control shadow-sm" id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide father's name.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="motherName" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Mother Name</label>
                        <input type="text" className="form-control shadow-sm" id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide mother's name.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="alternateNumber" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Alternate Number</label>
                        <input type="text" className="form-control shadow-sm" id="alternateNumber" name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide alternate number.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Contact Number</label>
                        <input type="text" className="form-control shadow-sm" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide contact number.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="address1" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Address Line 1</label>
                        <input type="text" className="form-control shadow-sm" id="address1" name="address1" value={formData.address1} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide address line 1.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="address2" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Address Line 2</label>
                        <input type="text" className="form-control shadow-sm" id="address2" name="address2" value={formData.address2} onChange={handleChange} />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="city" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>City</label>
                        <input type="text" className="form-control shadow-sm" id="city" name="city" value={formData.city} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide city.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="state" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>State</label>
                        <input type="text" className="form-control shadow-sm" id="state" name="state" value={formData.state} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide state.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="postal_code" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Postal Code</label>
                        <input type="text" className="form-control shadow-sm" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide postal code.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="country" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Country</label>
                        <input type="text" className="form-control shadow-sm" id="country" name="country" value={formData.country} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide country.
                        </div>
                      </div>
                      <div className="mb-3">
                            <label htmlFor="classTable.classId" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Class</label>
                            <select className="form-control shadow-sm" id="classTable.classId" name="classTable.classId" value={formData.classTable.classId} onChange={handleChange} required>
                              <option value="">Select Class</option>
                              {classTable.map(classStudent => (
                                <option key={classStudent.classId} value={classStudent.classId}>{classStudent.classStudent}</option>
                              ))}
                            </select>
                            <div className="invalid-feedback">
                              Please select a class.
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="section.sectionId" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Section</label>
                            <select className="form-control shadow-sm" id="section.sectionId" name="section.sectionId" value={formData.section.sectionId} onChange={handleChange} required>
                              <option value="">Select Section</option>
                              {sections.map(section => (
                                <option key={section.sectionId} value={section.sectionId}>{section.section}</option>
                              ))}
                            </select>
                            <div className="invalid-feedback">
                              Please select a section.
                            </div>
                          </div>
                      <div className="mb-3">
                        <label htmlFor="fees" className="form-label d-flex" style={{ color: '#525F7F', fontWeight: 'bold' }}>Fees</label>
                        <input type="text" className="form-control shadow-sm" id="fees" name="fees" value={formData.fees} onChange={handleChange} required />
                        <div className="invalid-feedback">
                          Please provide fees.
                        </div>
                      </div>

                      <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary btn-lg shadow-sm">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
