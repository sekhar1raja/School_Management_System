import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationPage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-header text-center  text-white " style={{background:'#F7871B'}}>
              <h2>Profile</h2>
            </div>
           
            <div className="card-body">
          
              <div className="row" style={{background:'#F7FAFC'}}>
                <div className="col-md-8">
                  <form>
                    <div className="mb-4">
                        <div className="d-flex justify-content-around align-items-center"> 
                            <h4 style={{ color: '#525F7F',fontWeight:'bolder' }}>Personal Information</h4>
                        <button type="submit" className="btn btn-success m-3">Edit Profile</button></div>
                     
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>First Name</label>
                        <input type="text" className="form-control shadow-sm" id="firstName" name="firstname" required />
                        <div className="invalid-feedback">
                          Please provide a first name.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Last Name</label>
                        <input type="text" className="form-control shadow-sm" id="lastName" name="lastname" required />
                        <div className="invalid-feedback">
                          Please provide a last name.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Password</label>
                        <input type="password" className="form-control shadow-sm" id="password" name="password" required />
                        <div className="invalid-feedback">
                          Please provide a password.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="examiner" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Email</label>
                        <input type="Email" className="form-control shadow-sm" id="examiner" name="email" required />
                        <div className="invalid-feedback">
                          Please provide an examiner.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label d-flex"style={{ color: '#525F7F',fontWeight:'bold' }}>Gender</label>
                        <select className="form-control shadow-sm" id="gender" name="gender" required>
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
                        <label htmlFor="role" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Role</label>
                        <input type="text" className="form-control shadow-sm" id="role" name="role" required />
                        <div className="invalid-feedback">
                          Please provide a role.
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 style={{ color: '#525F7F' }}>Contact Details</h4>
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Contact Number</label>
                        <input type="tel" className="form-control shadow-sm" id="contactNumber" name="Contactnumber" required />
                        <div className="invalid-feedback">
                          Please provide a contact number.
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 style={{ color: '#525F7F' }}>Address</h4>
                      <div className="mb-3">
                        <label htmlFor="address1" className="form-label d-flex"style={{ color: '#525F7F',fontWeight:'bold' }}>Address</label>
                        <input type="text" className="form-control shadow-sm" id="address1" name="Address1" required />
                        <div className="invalid-feedback">
                          Please provide an address.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address2" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Address 2</label>
                        <input type="text" className="form-control shadow-sm" id="address2" name="Address2" />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="city" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>City</label>
                          <input type="text" className="form-control shadow-sm" id="city" name="City" required />
                          <div className="invalid-feedback">
                            Please provide a city.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="zipCode" className="form-label d-flex"style={{ color: '#525F7F',fontWeight:'bold' }}>Zip Code</label>
                          <input type="text" className="form-control shadow-sm" id="zipCode" name="ZipCode" required />
                          <div className="invalid-feedback">
                            Please provide a zip code.
                          </div>
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="country" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Country</label>
                          <input type="text" className="form-control shadow-sm" id="country" name="country" required />
                          <div className="invalid-feedback">
                            Please provide a country.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 style={{ color: '#525F7F' }}>About Me</h4>
                      <div className="col-md-12 mb-3">
                      <div className="col-md-12 mb-3">
                      <label htmlFor="Position" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>Position</label>
                            <input type="text" className="form-control shadow-sm" id="Position" name="Position" required />
                            <div className="invalid-feedback">
                            Position
                            </div>
                        </div>
                        <div className="col-md-12 mb-3 d-flex ">
                            <div className="col-md-4 m-3">
                            <label htmlFor="salary" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>salary</label>
                            <input type="text" className="form-control shadow-sm" id="salary" name="Position" required />
                            <div className="invalid-feedback">
                            salary
                            </div>
                            </div>
                            <div className="col-md-4 m-3">
                           
                            <label htmlFor="experience" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>experience</label>
                          <input type="text" className="form-control shadow-sm" id="experience" name="experience" required />
                          <div className="invalid-feedback">
                          Experience
                          </div>
                            </div>
                        </div>
                       
                      </div>
                    
                      <div className="mb-3">
                        <label htmlFor="aboutMe" className="form-label d-flex" style={{ color: '#525F7F',fontWeight:'bold' }}>About Me</label>
                        <textarea className="form-control shadow-sm" id="aboutMe" name="about" rows="3" required></textarea>
                        <div className="invalid-feedback">
                          Please tell us about yourself.
                        </div>
                      </div>
                      
                    </div>

                    <div className="d-flex justify-content-end ">
                      <button type="submit" className="btn btn-success m-3">Update</button>
                      <button type="button" className="btn btn-danger m-3">Cancel</button>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <div className="card text-center shadow-sm">
                    <div className="card-body flex-column">
                      <img src="https://via.placeholder.com/150" className="card-img-top rounded-circle mb-3" alt="Profile" />
                      <h5 className="card-title">John Doe</h5>
                      <p className="card-text">
                        <strong>Email:</strong> john.doe@example.com<br />
                        <strong>Contact Number:</strong> (123) 456-7890
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

export default RegistrationPage;
