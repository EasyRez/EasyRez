import React, { useState } from 'react';
import { TextField } from '@mui/material';

const CreateClass = () => {

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
        <h1>Create Class</h1>
        <TextField id="name" className='classTextField' style={style.button} label="Name"/>
        <TextField id="price" className='classTextField' style={style.button} label="Price"/>
        <p></p>
        <TextField id="duration" className='classTextField' style={style.button} label="Duration"/>
      </div>
    )
};
  
export default CreateClass;