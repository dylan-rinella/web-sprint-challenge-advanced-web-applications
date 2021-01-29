import React, { useEffect, useState } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth'
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: '',
  password: ''
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialValues)

  const { push } = useHistory()

  const handleChange = e => {
    setFormValues({
      ...formValues,
    [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', formValues)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        push('/bubbles-page')
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1>Please Sign In</h1>
      <input 
        type='text'
        name='username'
        placeholder='username'
        value={formValues.username}
        onChange={handleChange}
      />
      <input 
        type='password'
        name='password'
        placeholder='password'
        value={formValues.password}
        onChange={handleChange}
      />
      <button>Sign In</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.