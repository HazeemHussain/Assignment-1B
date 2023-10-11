import React from 'react'
import LoginForm from '@/components/userLogin/LoginForm';
import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import axios from 'axios';
import { useEffect } from "react";





export default function SignUp() {


    return (
      <div className='Container'>
         <h1>Sign UP Page </h1>
         <p> Please fill The sign up page 
         </p>
        <div>
          <p> UserName</p>
        <input>
        </input>
        </div>

        <div>
          <p> Password</p>
        <input>
        </input>
        </div>

        <div>
          <p> Email</p>
        <input>
        </input>
        </div>

        
         <button> Sign UP </button>
         

         <LoginForm/>
      </div>


        
      
    );
  }
  