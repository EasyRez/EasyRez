import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Button } from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

const CreateTimeSlot = (props) => {

  const { businessId } = props;
  const [servicesList, setServicesList] = useState([{ service_name: 'beginner'}, { service_name: 'intermediate'}, { service_name: 'expert'}]);
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();

  // TODO: is this API endpoint correct? (fetch services given business id)
  useEffect( () => {
    console.log('entering useEffect in create timeslot');
    async function fetchData(){
      try {
        const response = await fetch(`http://localhost:3000/api/businesses/services/${businessId.business_id}`);
        const array = await response.json();
        console.log('servicesList: ', array);
        setServicesList(array);
      } catch (error){
        console.error(error);
      }
    }
    fetchData();
  }, [businessId]);

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

  const handleSelect = (event) => {
    console.log(event.target);
    const { innerText } = event.target;
    for (const service of servicesList){
      if (service.service_name === innerText){
        setSelectedServiceId(service.service_id);
        // setSelectedDuration(service.service_duration);
      }
    }
  }

  // MM/DD/YYYY 
  // HH: MM: SS?
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    switch(id){
      case 'starting-time':
        setStartingTime(value);
        break;
      case 'ending-time':
        setEndingTime(value);
        break;
    }
  }

  const handleSubmit = async (event) => {
    // serviceId, maxSpaces, timeslotStartTime, timeslotEndTime
    const service = { businessId: businessId.business_id, serviceId: selectedServiceId, timeslotStartTime: startingTime, timeslotEndTime: endingTime }
    console.log(service);
    try {
      const response = await fetch('http://localhost:3000/api/businesses/createTimeslot', {
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
      <h1>Create Time Slot</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={servicesList.map(el => el.service_name)}
        sx={{ width: 300}}
        renderInput={(params) => <TextField {...params} label="Class" />}
        onChange={handleSelect}
      />
      {/*<TextField id="starting-time" className='classTextField' style={style.button} label="Starting Time" onChange={handleInputChange}/>*/}
      {/*<TextField id="ending-time" className='classTextField' style={style.button} label="Ending Time" onChange={handleInputChange}/>*/}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label="Basic date time picker" onChange={(event) => {setStartingTime(event.$d)}}/>
        </DemoContainer>
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label="Basic date time picker" onChange={(event) => {setEndingTime(event.$d)}}/>
        </DemoContainer>
      </LocalizationProvider>

      <Button id="create-time-slot" onClick={()=>{handleSubmit()}}>Submit</Button>
    </div>
  )
};
  
export default CreateTimeSlot;