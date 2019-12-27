import React from 'react';
import SignIn from '../../components/SignIn/SignIn.jsx'
import SignUp from '../../components/sign-up/SignUp.jsx'

import './SignIn-SignUp.scss'

const SignInSignUp = () => (
  <div className='sign-in-and-sign-up'>
    <SignIn />
    <SignUp />
  </div>
)

export default SignInSignUp;