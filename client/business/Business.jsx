import React, { useState, useEffect } from 'react';
import CreateContainer from './containers/CreateContainer';
import Header from './components/Header';

const Business = (props) => {

  const { userId } = props;

  const [businessId, setBusinessId] = useState();

  useEffect( () => {
    // fetch business id from user id
    async function fetchData(){
      try{
        console.log(userId);
        const response = await fetch(`http://localhost:3000/api/businesses/user/${userId}`);
        const id = await response.json();
        console.log('the business id is: ', id);
        setBusinessId(id);
      } catch (error){
        console.error(error);
      }
    }
    fetchData();
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