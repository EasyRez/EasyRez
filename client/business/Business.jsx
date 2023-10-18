import React, { useState, useEffect } from 'react';
import CreateContainer from './containers/CreateContainer';
import Header from './components/Header';

const Business = (props) => {

  const { userId } = props;

  const [businessId, setBusinessId] = useState();

  useEffect( async () => {
    // fetch business id from user id
    const response = await fetch(`http://localhost:3000/api/business/getId:${userId}`);
    const id = await response.json();
    console.log('the business id is: ', id);
    setBusinessId(id);
  }, [userId]);

    return (
      <div>
        <h1>This is Business</h1>
        <Header/>
        <CreateContainer businessId={businessId} />
      </div>
    )
};
  
export default Business;