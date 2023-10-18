import React, { useState } from 'react';
import Consumer from './consumer/Consumer';
import Business from './business/Business';
import ConsumerLogin from './login/containers/ConsumerLogin';
import BusinessLogin from './login/containers/BusinessLogin';
import { Button } from '@mui/material';

const App = () => {

  const [userId, setUserId] = useState(6);
  const [loginNav, navigateLogin] = useState('consumerPage');

  console.log(loginNav);

  let page = <Consumer userId={userId}/>
  /*switch(loginNav){
    case 'consumerLogin':
      page = <ConsumerLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
    case 'businessLogin':
      page = <BusinessLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
    case 'consumerPage':
      page = <Consumer userId={userId}/>
    case 'businessPage':
      page = <Business userId={userId}/>
  }*/

    return (
      <div>
        <h1>This is App</h1>
        <Button id="cLogin" label="Customer Login" onClick={() => {navigateLogin('consumerLogin')}}>Consumer</Button>
        <Button id="bLogin" label="Business Login" onClick={() => {navigateLogin('businessLogin')}}>Business</Button>
        {/*Everything below will be replaced with the 'page' variable*/}
        {page}
        {/* <Consumer userId={userId}/> */}
        {/* <Business userId={userId} /> */}
      </div>
    )
};
  
export default App;