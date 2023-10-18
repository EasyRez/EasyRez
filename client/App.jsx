import React, { useState } from 'react';
import Consumer from './consumer/Consumer';
import Business from './business/Business';
import ConsumerLogin from './login/containers/ConsumerLogin';
import BusinessLogin from './login/containers/BusinessLogin';
import { Button } from '@mui/material';

const App = () => {

  const [userId, setUserId] = useState(6);
  const [loginNav, navigateLogin] = useState('consumerLogin');

  console.log(loginNav);

  let page = <ConsumerLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
  switch(loginNav){
    case 'consumerLogin':
      page = <ConsumerLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
      break;
    case 'businessLogin':
      page = <BusinessLogin setUserId={setUserId} navigateLogin={navigateLogin}/>
      break;
    case 'consumerPage':
      page = <Consumer userId={userId}/>
      break;
    case 'businessPage':
      page = <Business userId={userId}/>
      break;
  }

    return (
      <div>
        {page}
      </div>
    )
};
  
export default App;