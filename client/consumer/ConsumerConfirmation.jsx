import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';

export default function FormPropsTextFields(selectedServiceId, userId, selectedTimeId) {
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
    {/*<Button variant="contained">{`Book ${selectedServiceId} for ${userId} at ${selectedTimeId}`}</Button>*/}

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