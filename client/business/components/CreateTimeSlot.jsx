import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';

const CreateTimeSlot = () => {

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

  let defaultList = ['beginner', 'intermediate', 'expert']

  return (
    <div id="create-box">
      <h1>Create Time Slot</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={defaultList}
        sx={{ width: 300}}
        renderInput={(params) => <TextField {...params} label="Class" />}
      />
      <TextField id="starting-time" className='classTextField' style={style.button} label="Starting Time"/>
    </div>
  )
};
  
export default CreateTimeSlot;