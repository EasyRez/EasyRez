import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import styles from '../styles.scss';

const AvailableServices = ({ availableServices, setAvailableServices, setSelectedServiceId, businessId, selectedServiceId }) => {
    //const [selectedService, setSelectedService] = useState("null");
    const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/reservations/services:${businessId}`);
      const array = await response.json();
      setAvailableServices(array);
      console.log(array);
    } catch (error) { 
        console.error(error);
        }  
    };

  useEffect(() => {
    fetchData(); //fetches data when businessID or setAvailableServices change
}, [businessId])

    const handleService = (event) => {
        setSelectedServiceId(event.target.value);
      }

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
      {availableServices?.map((service, index) => (
          <MenuItem key={index} value={service}>{service}</MenuItem>
      ))}
      </Select>
    </div>
    )
};

export default AvailableServices;