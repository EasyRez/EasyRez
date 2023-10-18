import React, { useState, Dispatch } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material'

const ConsumerLogin = (props) => {
  
  const [uInput, changeU] = useState('');
  const [pInput, changeP] = useState('');
  const { setUserId } = props

    return (
      <div>
        <h1>This is Consumer Login</h1>
        <TextField id="username" label="Username" onChange={(event) => {changeU(event.target.value)}}/>
        <TextField id="password" label="Password" onChange={(event) => {changeP(event.target.value)}}/>
        <Button id="login" label="Sign In" onClick={() => {
          setUserId(uInput)
          navigateLogin('business')
          }}/>
      </div>
    )
};
  
export default ConsumerLogin;