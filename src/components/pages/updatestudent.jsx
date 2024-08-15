import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationPages() {
  const { userId } = useParams(); // Get the user ID from the URL parameters
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
    section: { sectionId: "" },
    coursesOffered: {
        courseOfferedId: ""
    },
    fees: "",
    semester: "",
  });

  const [sections, setSections] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
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
          toast.error("Failed to fetch user data.");
        }
      };
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch("http://localhost:8080/util/section");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error("Failed to fetch section:", error);
        toast.error("Failed to fetch sections.");
      }
    };
    fetchSection();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/util/course");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast.error("Failed to fetch courses.");
      }
    };
    fetchCourses();
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://localhost:8080/user/user`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Success:", data);
      toast.success("User updated successfully.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating user.");
    }
  };

  return (
    
    <div className="container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="mb-4">
              <h4 style={{ color: "#525F7F" }}>Update The Information</h4>
              {/* <p>ID: {userId}</p> */}
            </div>

            <div className="">
              <div className="row" style={{ background: "#F7FAFC" }}>
                <div className="col-md-12">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="d-flex justify-content-around align-items-center">
                        <h4 style={{ color: "#525F7F", fontWeight: "bolder" }}>
                          Personal Information
                        </h4>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="firstName"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          r
                        />
                        <div className="invalid-feedback">
                          Please provide a first name.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="lastName"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          
                        />
                        <div className="invalid-feedback">
                          Please provide a last name.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control shadow-sm"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          
                        />
                        <div className="invalid-feedback">
                          Please provide a password.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control shadow-sm"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          
                        />
                        <div className="invalid-feedback">
                          Please provide an email.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="roles.id"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Roles
                        </label>
                        <select
                        className="form-control shadow-sm"
                        id="roles.id"
                        name="roles.id"
                        value={formData.roles ? formData.roles.id : ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Role</option>
                        <option value="2">Teacher</option>
                        <option value="3">Student</option>
                      </select>
                        <div className="invalid-feedback">
                          Please select a role.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="gender"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Gender
                        </label>
                        <select
                          className="form-control shadow-sm"
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          
                        >
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
                        <label
                          htmlFor="fatherName"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Father Name
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="fatherName"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleChange}
                          
                        />
                        <div className="invalid-feedback">
                          Please provide a father name.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="motherName"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Mother Name
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="motherName"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleChange}
                          
                        />
                        <div className="invalid-feedback">
                          Please provide a mother name.
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="alternateNumber"
                          className="form-label d-flex"
                          style={{ color: "#525F7F", fontWeight: "bold" }}
                        >
                          Alternate Number
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          id="alternateNumber"
                          name="alternateNumber"
                          value={formData.alternateNumber}
                          onChange={handleChange}
                          
                        />
                        <div className="invalid-feedback">
                          Please provide an alternate number.
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="contactNumber"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            Contact Number
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide a contact number.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="address1"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            Address 1
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="address1"
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide address 1.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="address2"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            Address 2
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="address2"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide address 2.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="city"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide a city.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="state"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide a state.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="postal_code"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            Postal Code
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="postal_code"
                            name="postal_code"
                            value={formData.postal_code}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide a postal code.
                          </div>
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="country"
                            className="form-label d-flex"
                            style={{ color: "#525F7F", fontWeight: "bold" }}
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-sm"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            
                          />
                          <div className="invalid-feedback">
                            Please provide a country.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mb-3">
                      <label
                        htmlFor="classTable.classId"
                        className="form-label d-flex"
                        style={{ color: "#525F7F", fontWeight: "bold" }}
                      >
                        Class
                      </label>
                      <select
                        className="form-control shadow-sm"
                        id="classTable.classId"
                        name="classTable.classId"
                        value={formData.classTable.classId}
                        onChange={handleChange}
                        
                      >
                        <option value="">Select Class</option>
                        {classTable.map((classItem) => (
                          <option key={classItem.classId} value={classItem.className}>
                            {classItem.className}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select a class.
                      </div>
                    </div> */}

                    <div className="mb-3">
                      <label
                        htmlFor="section.sectionId"
                        className="form-label d-flex"
                        style={{ color: "#525F7F", fontWeight: "bold" }}
                      >
                        Section
                      </label>
                      <select
                      className="form-control shadow-sm"
                      id="section.sectionId"
                      name="section.sectionId"
                      value={formData.section ? formData.section.sectionId : ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Section</option>
                      {sections.map((section) => (
                        <option key={section.sectionId} value={section.sectionId}>
                          {section.section}
                        </option>
                      ))}
                    </select>
                      <div className="invalid-feedback">
                        Please select a section.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="coursesOffered"
                        className="form-label d-flex"
                        style={{ color: "#525F7F", fontWeight: "bold" }}
                      >
                        Courses Offered
                      </label>
                      <select
                        className="form-control shadow-sm"
                        id="coursesOffered.courseOfferedId"
                        name="coursesOffered.courseOfferedId"
                        value={formData.coursesOffered ? formData.coursesOffered.courseOfferedId:""}

                        onChange={handleChange}
                        
                      >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                          <option key={course.courseOfferedId} value={course.courseOfferedId}>
                            {course.courseName}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select a course.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="fees"
                        className="form-label d-flex"
                        style={{ color: "#525F7F", fontWeight: "bold" }}
                      >
                        semester
                      </label>
                      <input
                        type="number"
                        className="form-control shadow-sm"
                        id="currentSemester"
                        name="currentSemester"
                        value={formData.semester}
                        onChange={handleChange}
                        
                      />
                      <div className="invalid-feedback">
                        Please provide the semester.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="fees"
                        className="form-label d-flex"
                        style={{ color: "#525F7F", fontWeight: "bold" }}
                      >
                        Fees
                      </label>
                      <input
                        type="number"
                        className="form-control shadow-sm"
                        id="fees"
                        name="fees"
                        value={formData.fees}
                        onChange={handleChange}
                        
                      />
                      <div className="invalid-feedback">
                        Please provide the Salary.
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary col-lg-4">
                      Update Profile
                    </button>
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

export default RegistrationPages;
