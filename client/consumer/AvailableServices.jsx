import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import styles from '../styles.scss';

const AvailableServices = ({ availableServices, setAvailableServices, setSelectedServiceId, businessId, selectedServiceId }) => {
    //const [selectedService, setSelectedService] = useState("null");
    async function fetchData(){
      try {
        console.log('this is the business id: ', businessId.business_id)
        const response = await fetch(`http://localhost:3000/api/businesses/services/${businessId.business_id}`);
        const array = await response.json();
        console.log('servicesList: ', array);
        setAvailableServices(array);
      } catch (error){
        console.error(error);
      }
    }

  useEffect(() => {
    fetchData(); //fetches data when businessID or setAvailableServices change
}, [businessId])

    const handleService = (event) => {
      
        setSelectedServiceId(event.target.value);
        // console.log('selectedServiceId: ', selectedServiceId);
      }

    let menuItems = availableServices?.map((service, index) => {
      console.log('service: ', service);
      return (
        <MenuItem key={index} value={service.service_id}>{service.service_name}</MenuItem>
      )
    });


    return (
      <div className= 'listOfServices'>
      <Select
        value={selectedServiceId} //value
        onChange={handleService}
        sx={{
          margin: 10,
          width: 250,
          height: 50,
        }}
      > 
      {menuItems}
      </Select>
    </div>
    )
};

export default AvailableServices;