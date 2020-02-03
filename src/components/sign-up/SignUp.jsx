import React, { useState } from 'react';
import { connect } from 'react-redux'

import FormInput from '../form-input/FormInput.jsx';
import CustomButton from '../custom-button/CustomButton.jsx'

import {auth, createUserProfileDocument } from '../../firebase/firebase.utils.js';
import { signupStart } from '../../redux/user/user.actions'

import './SignUp.scss'

const SignUp = ({ signupStart }) => {

  const [userCredentials, setCredentials] = useState({displayName: '', email: '', password: '', confirmPassword: ''})
  const {displayName, email, password, confirmPassword} = userCredentials

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return;
    }

    const { signupStart } = this.props

    signupStart({displayName, email, password})
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(email, password)

    //   await createUserProfileDocument(user, {displayName})
    //   this.setState({
    //     displayName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    //   })

    // } catch(error) {
    //   console.error('error at' + error)
    // }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({...userCredentials, [name]: value})

  }

    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />

         <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='email'
            required
          />

         <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='password'
            required
          />

          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />

        <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    )
}

const mapDispatchToProps = dispatch => ({
  signupStart: (userCredentials) => dispatch(signupStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp)