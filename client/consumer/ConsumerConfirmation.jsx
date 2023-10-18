import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';

export default function FormPropsTextFields({isReserved, setIsReserved, selectedServiceId, availableServices, userId, selectedTimeId}) {
  let serviceName;
  console.log('availableServices: ', availableServices);
  console.log('selectedServiceId: ', selectedServiceId);
  if (availableServices && selectedServiceId){
    console.log('determining serviceName')
    for (const service of availableServices){
      console.log(service);
      console.log(service.service_id)
      if (service.service_id === selectedServiceId){
        serviceName = service.service_name;
        break;
      }
    }
  }

  const handleSubmit = async (event) => {
    // serviceId, maxSpaces, timeslotStartTime, timeslotEndTime
    const timeslot = { timeslotId: selectedTimeId, userId }
    console.log(timeslot);
    try {
      const response = await fetch('http://localhost:3000/api/reservations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeslot),
      });
      const data = await response.json();
      console.log(data);
      setIsReserved(true);
    } catch (error){
      console.error(error);
    }
  }

  let buttonText = isReserved ? 'Booked successfully!' : `Book ${serviceName || 'service'} at selected time.`
  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
          <div className="name-field">
        <TextField
          required
          id="name-field"
          label="Required"
          defaultValue="Name"
        />
          </div>
          <div className="email-field">
        <TextField
          required
          id="email-field"
          label="Required"
          defaultValue="Email"
        />
          </div>
        {/*<TextField
          required
          id="Phone-required"
          label="Required"
          defaultValue="Phone Number"
        />
        */}
        <div className="confirm-button">
          <Button variant="contained" onClick={handleSubmit}>{buttonText}
          </Button>
        </div>

      </div>
    </Box>
  );
}

/*
const ConsumerConfirmation = (selectedTimeId, userId) => {

//Booking button logic
//submit consumer information into database
//remove availability/ and time from company's availability

return (
      //Booking
    )
};
  
export default Consumer;
*/

//stretch:
//add booking to consumer's account