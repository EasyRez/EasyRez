import React, { useState } from 'react';
import Consumer from './consumer/Consumer';
import Business from './business/Business';
import ConsumerLogin from './login/containers/ConsumerLogin';
import BusinessLogin from './login/containers/BusinessLogin';
import { Button } from '@mui/material';

const App = () => {

  const [userId, setUserId] = useState();
  const [loginNav, navigateLogin] = useState();

  let page
  switch(loginNav){
    case 'consumerLogin':
      page = <ConsumerLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
    case 'businessLogin':
      page = <BusinessLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
    case 'consumerPage':
      page = <Consumer userId={userId}/>
    case 'businessPage':
      page = <Business userId={userId}/>
  }

    return (
      <div>
        <h1>This is App</h1>
        <Button id="cLogin" label="Customer Login" onClick={() => {navigateLogin('consumerLogin')}}/>
        <Button id="bLogin" label="Business Login" onClick={() => {navigateLogin('businessLogin')}}/>
        {/*Everything below will be replaced with the 'page' variable*/}
        {/*<Consumer/>*/}
        <Business userId={userId} />
      </div>
    )
};
  
export default App;