import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const CreateClass = (props) => {

  const { businessId } = props;

  const [serviceName, setServiceName] = useState();
  const [servicePrice, setServicePrice] = useState();
  const [serviceDuration, setServiceDuration] = useState();

  const style = {
    button: {
      padding: "0.5rem",
      maxLength: "12cm"
      //display: "inline-block"
    },
    button2: {
      padding: "0.5rem",
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    switch(id){
      case 'name':
        setServiceName(value);
        break;
      case 'price':
        setServicePrice(Number(value));
        break;
      case 'duration':
        setServiceDuration(Number(value));
        break;
    }
  }

  // TODO: verify this API route for posting a new service
  const handleSubmit = async (event) => {
    const service = { businessId, name: serviceName, price: servicePrice, duration: serviceDuration }
    try {
      const response = await fetch('http://localhost:3000/api/business/createService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.error(error);
    }
  }

    return (
      <div id="create-box">
        <h1>Create Class</h1>
        <TextField id="name" className='classTextField' style={style.button} label="Name" value={serviceName}/>
        <TextField id="price" className='classTextField' style={style.button} label="Price" value={servicePrice}/>
        <p></p>
        <TextField id="duration" className='classTextField' style={style.button} label="Duration" value={serviceDuration}/>
        <Button onClick={handleSubmit} id="create-class"/>
      </div>
    )
};
  
export default CreateClass;