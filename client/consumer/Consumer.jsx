import React from 'react';
import { useState } from "react";
import AvailableTimes from './AvailableTimes';
import AvailableServices from './AvailableServices';
import FormPropsTextFields from './ConsumerConfirmation';
import styles from '../styles.scss'
//BusinessID, services from businessID, times associated with service from businessID

//create class selection logic
  
const Consumer = () => {
  
  const [userId, setUserId] = useState('hardcoded_user_id')
  const [businessId, setBusinessId] = useState('hardcoded_id');
  const [availableServices, setAvailableServices] = useState();
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [availableTimes, setAvailableTimes] = useState();
  const [selectedTimeId, setSelectedTimeId] = useState();

  // fetch request ---> response (array of availbale services)
  // setAvailableServices(response)

    
  return (
    <div className = 'entireForm'>
      <AvailableServices
        availableServices={availableServices}
        setAvailableServices={setAvailableServices}
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
      />
      {/*<AvailableTimes
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
        availableTimes={availableTimes}
        setAvailableTimes={setAvailableTimes}
        selectedTimeId={selectedTimeId}
        setSelectedTimeId={setSelectedTimeId}
        />
  */}
     <FormPropsTextFields
      selectedServiceId={selectedServiceId}
      selectedTimeId={selectedTimeId}
      userId={userId}/>
    </div>
    )
}
export default Consumer;



//choose a class button (consumer) --| available times button (availabletimes) --| confirmation (consumerconfirmation) --| booking button (booking)
  //each subsequent buttons are greyed out/ unavailable until preceeding selection is made
//stretch:
//scheduled classes button

//request types:
//GET, POST
//stretch:
//PATCH, GET, DELETE