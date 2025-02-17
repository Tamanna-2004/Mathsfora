import React, { useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // Function to handle form submission
    e.preventDefault(); // Prevents the default form submission (page reload)
    // ✅ Step 1: Validate Form Data
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      alert("All fields are required"); // Show alert if any field is missing
      return; // Stop further execution
    }

    // ✅ Step 2: Check if passwords match
    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match"); // Alert if passwords don't match
      return; // Stop further execution
    }

    try {
      // ✅ Step 3: Send data to the backend using Fetch API
      console.log("inside try block");
      const response = await fetch("http://localhost:5500/api/register", {
        method: "POST", // Using POST to send data
        headers: {
          "Content-Type": "application/json", // Tells server we are sending JSON data
        },
        body: JSON.stringify(formData), // Convert form data object to JSON format
      });

      // ✅ Step 4: Get the server response
      const data = await response.json(); // Convert response to JSON

      if (!response.ok) {
        console.error("Error:", data); // Log the full error response
        alert(data.message || "Something went wrong!!!!");
      } else {
        toast.success("account created");
        navigate("/login");
      }
    } catch (error) {
      // ✅ Step 5: Handle any unexpected errors (e.g., server down, network error)
      console.error("Signup Error:", error); // Log error to console
      alert("Something went wrong!"); // Show generic error message
    }
  };
  return (
    <div>
      <div className="signIn_page">
        {/* <img src={Logo} alt="" /> */}
        <div className="container">
          <form className="login_form" onSubmit={handleSubmit}>
            <h2>Sign-Up</h2>
            <div className="form_feild">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form_feild">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form_feild">
              <label htmlFor="tel">Mobile number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form_feild">
              <label htmlFor="password">Password</label>
              <input
                type="Password"
                name="password"
                id="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form_feild">
              <label htmlFor="password">Password again</label>
              <input
                type="Password"
                name="confirmpassword"
                id="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
            </div>
            <button className="signin_btn" type="submit">
              Continue
            </button>
            <hr />
            <p>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
