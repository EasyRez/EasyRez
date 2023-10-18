import React, { useState, Dispatch } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material'

const BusinessLogin = (props) => {
  
  const [uInput, changeU] = useState('');
  const [pInput, changeP] = useState('');
  const { setUserId } = props
  const { navigateLogin } = props

    return (
      <div>
        <Button id="cLogin" label="Customer Login" onClick={() => {navigateLogin('consumerLogin')}}>Consumer</Button>
        <Button id="bLogin" label="Business Login" onClick={() => {navigateLogin('businessLogin')}}>Business</Button>
        <h1>Business Login</h1>
        <TextField id="username" label="Username" onChange={(event) => {changeU(event.target.value)}}/>
        <TextField id="password" label="Password" onChange={(event) => {changeP(event.target.value)}}/>
        <Button id="login" label="Sign In" onClick={() => {
          setUserId(uInput)
          navigateLogin('businessPage')
          }}>Log In</Button>
      </div>
    )
};
  
export default BusinessLogin;