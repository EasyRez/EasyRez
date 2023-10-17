import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";


const AvailableServices = ({ availableServices, setAvailableServices, setSelectedServiceId, businessId }) => {
  
  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch(`localhost:3000/api/reservations/services:${businessId}`);
      const array = await response.json();
      setAvailableServices(array);
      console.log(array);
    } catch (error) { 
        console.error(error);
        }  
    };
    fetchData(); //fetches data when businessID or setAvailableServices change
}, [businessId, setAvailableServices])
  

    const handleService = (event) => {
        selectService(event.target.service);
      }

    return (
      <div className = 'listOfServices'>
      <Select
        services={availableServices} //value
        onChange={handleService}
        sx={{
          marginTop: 10,
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