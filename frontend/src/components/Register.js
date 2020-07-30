import React, { useState } from 'react'
import axios from 'axios'

const Register = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  function handleChange(event) {
    const name = event.target.name
    const data = {
      ...formData,
      [name]: event.target.value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    axios.post('/api/register', formData)
      .then(() => {
        props.history.push('/login')
      })
  }

  return <>
    <form className="register-form" onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        name="username"
        onChange={handleChange}
        type="text"
        placeholder="username"
        value={formData.username}
      />
      <label>Email</label>
      <input
        name="email"
        onChange={handleChange}
        type="text"
        placeholder="you@you.com"
        value={formData.email}
      />
      <label>Password</label>
      <input
        name="password"
        onChange={handleChange}
        type="password"
        placeholder="********"
        value={formData.password}
      />
      <label>Confirm Password</label>
      <input
        name="passwordConfirmation"
        onChange={handleChange}
        type="password"
        placeholder="********"
        value={formData.passwordConfirmation}
      />
      <div className="button-container" >
        <button>Register</button>
      </div>
    </form>
  </>

}

export default Register 