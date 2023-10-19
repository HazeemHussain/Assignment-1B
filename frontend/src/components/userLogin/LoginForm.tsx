import axios from 'axios';
import { useEffect } from "react";
import { FormEvent, useState } from "react";
import React, { ChangeEvent } from 'react';



export default function LoginForm() {


    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

      const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
      };
    

    return ( 
        <div className="Container">
        <h1>LOG IN </h1>
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
  
        
          <button type="submit">LogIn</button>
          
        </form>
  
        {/* Include the LoginForm component here */}
        {/* <LoginForm /> */}
      </div>
    );
}