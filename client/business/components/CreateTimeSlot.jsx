import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Button } from '@mui/material';

const CreateTimeSlot = (props) => {

  const { businessId } = props;
  const [servicesList, setServicesList] = useState(['beginner', 'intermediate', 'expert']);
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [startingTime, setStartingTime] = useState();

  // TODO: is this API endpoint correct? (fetch services given business id)
  useEffect( async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/business/services:${businessId}`);
      const array = await response.json();
      console.log('servicesList: ', array);
      setServicesList(array);
    } catch (error){
      console.error(error);
    }
  }, [businessId]);

  // TODO: we need a way for them to pick the service and update state
  // and update state when they type out the start time
  // also ensure the start time has proper input validation?


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

  return (
    <div id="create-box">
      <h1>Create Time Slot</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={servicesList}
        sx={{ width: 300}}
        renderInput={(params) => <TextField {...params} label="Class" />}
      />
      <TextField id="starting-time" className='classTextField' style={style.button} label="Starting Time"/>
      <Button id="create-time-slot"/>
    </div>
  )
};
  
export default CreateTimeSlot;