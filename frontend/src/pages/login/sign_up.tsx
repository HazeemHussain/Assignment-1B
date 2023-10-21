import React, { ChangeEvent } from 'react'
import LoginForm from '@/components/userLogin/LoginForm';
import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import axios from 'axios';
import { useEffect } from "react";


export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    user: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
  };

  return (
    <div className="Container">
      <h1>Sign Up Page</h1>
      <p>Please fill out the sign-up form</p>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <p>User Category </p>
          <select
          
            name="user"
            value={formData.user}
            onChange={handleSelectChange}
          >

          <p> Select a category </p>
          <option value = "User"> User</option>
          <option value = "Moderator"> Moderator</option>
          <option value = "Analyst"> Analyst</option>
          </select>
        </div>
      
        <button type="submit">Sign Up</button>
        
      </form>

   
    </div>
  );
}
