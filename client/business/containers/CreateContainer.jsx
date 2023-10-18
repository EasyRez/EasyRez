import React, { useState } from 'react';
import { Button } from '@mui/material';
import CreateClass from '../components/CreateClass';
import CreateTimeSlot from '../components/CreateTimeSlot';

const CreateBox = (props) => {

  const { businessId } = props;

  const [selection, menuSelect] = useState('class');

  let box
  switch(selection){
    case 'class':
      box = <CreateClass businessId={businessId} />
      break;
    case 'timeslot':
      box = <CreateTimeSlot businessId={businessId}/>
      break;
  }

    return (
      <div>
        <Button id="create-class-button" onClick={() => {menuSelect('class')}}>Create Class</Button>
        <Button id="create-timeslot-button" onClick={() => {menuSelect('timeslot')}}>Create Timeslot</Button>
        {box}
      </div>
    )
};
  
export default CreateBox;