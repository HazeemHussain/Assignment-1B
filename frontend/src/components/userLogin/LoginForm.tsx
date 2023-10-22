import React, { useState } from 'react';
import axios from 'axios';
import { FormEvent } from "react";
import { ChangeEvent } from 'react';

interface LoginFormProps {
  onLoginSuccess: () => void; // Define a callback function prop
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
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

      // If the login was successful, call the onLoginSuccess callback
      if (response.status === 200) {
        if(formData.username === 'Moderator' && formData.password === 'Moderator'){

            onLoginSuccess(); // Notify the parent component about the successful login

        } else if (formData.username === 'Analyst' && formData.password === 'Analyst') {

          onLoginSuccess(); // Notify the parent component about the successful login

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
    <label>
        <p>Username</p>
        <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
        />
    </label>
</div>

<div>
    <label>
        <p>Password</p>
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
        />
    </label>
</div>

        <button type="submit">Log In</button>
      </form>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}