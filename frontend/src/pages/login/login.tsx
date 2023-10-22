
import axios from 'axios';
import { useEffect } from "react";
import { FormEvent, useState } from "react";
import React, { ChangeEvent } from 'react';



export default function login() {


    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8082/api/user', formData);
        console.log(response.data); // Handle the response as needed
  
        // If the login was successful, you can redirect the user or perform other actions.
        if (response.status === 200) {
          // Redirect the user to the dashboard or another page
          // For example: window.location.href = '/dashboard';
          if(formData.username === 'Moderator' && formData.password === "Moderator"){

            window.location.assign("http://localhost:3000/moderator");
            alert("Login Successfully");

          } else if (formData.username === 'Analyst' && formData.password === "Analyst"){
            window.location.assign("http://localhost:3000/analyst");
            alert("Login Successfully");


          }else{
            window.location.assign("http://localhost:3000/");
            setErrorMessage('logged successfully');
          }
               
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
  
        // Display an error message to the user
        setErrorMessage('Login failed. Please check your credentials.');
      }
    };
  
    return (
      <div className="Container">
        <h1>LOG IN</h1>
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
  
          <button type="submit">Log In</button>
        </form>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }