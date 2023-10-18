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
    const service = { businessId: businessId.business_id, serviceName: serviceName, servicePrice: servicePrice, serviceDuration: serviceDuration }
    console.log(service);
    try {
      const response = await fetch('http://localhost:3000/api/businesses/createService', {
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
        <TextField id="name" className='classTextField' style={style.button} label="Name" onChange={handleInputChange} value={serviceName}/>
        <TextField id="price" className='classTextField' style={style.button} label="Price" onChange={handleInputChange} value={servicePrice}/>
        <p></p>
        <TextField id="duration" className='classTextField' style={style.button} label="Duration" onChange={handleInputChange} value={serviceDuration}/>
        <Button id="create-class" onClick={handleSubmit}>Submit</Button>
      </div>
    )
};
  
export default CreateClass;