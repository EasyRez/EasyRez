import React from 'react';
import { useState } from "react";
import AvailableTimes from './AvailableTimes';
import AvailableServices from './AvailableServices';
import FormPropsTextFields from './ConsumerConfirmation';
import styles from '../styles.scss'
//BusinessID, services from businessID, times associated with service from businessID

//create class selection logic
  
const Consumer = () => {
  
  const [userId, setUserId] = useState(3); // hardcoded
  const [businessId, setBusinessId] = useState({business_id: 1});
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState();
  const [availableTimes, setAvailableTimes] = useState();
  const [selectedTimeId, setSelectedTimeId] = useState();

  // useEffect( () => {
  //   console.log('entering useEffect in create timeslot');
  //   async function fetchData(){
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/businesses/services/${businessId.business_id}`);
  //       const array = await response.json();
  //       console.log('servicesList: ', array);
  //       setAvailableServices(array);
  //     } catch (error){
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [businessId]);

  // fetch request ---> response (array of availbale services)
  // setAvailableServices(response)

    
  return (
    <div className = 'entireForm'>
      <AvailableServices
        availableServices={availableServices}
        setAvailableServices={setAvailableServices}
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
        businessId={businessId}
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