import React, { useState } from 'react'
import './login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignIn = () => {

  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const response = await fetch("http://localhost:5500/api/login",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(!response.ok){
        toast.error("wrong email or password");
        console.log(data);
      }else
      {
      console.log("Login SUccessfull");
      // ✅ Store user data (for authentication)
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");
      navigate("/");
      }
    }
    catch(err){
      console.error("Login error: ", err);
      alert("Something went wrong");
    }
  }


  return (
    <div>
      <div className="signIn_page">
        {/* <img src={Logo} alt="" /> */}
        <div className="container">
      <form className="login_form" onSubmit={handleSubmit}>
        <h4>Sign-In</h4>
        <div className="form_feild">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email'
             value={formData.email} 
             onChange={handleChange}/>
        </div>
        <div className="form_feild">
            <label htmlFor="password">Password</label>
            <input type="Password" name='password' id='password' 
            value={formData.password}
            onChange={handleChange}
            placeholder=''/>
        </div>
        <button className='signin_btn'>Continue</button>
      </form>
      <p>new to us?</p>
      
      
      <NavLink to="/register" className='signup_btn'>
       Create Your Account
      </NavLink>
      </div>
      </div>
    </div>
  )
}

export default SignIn
