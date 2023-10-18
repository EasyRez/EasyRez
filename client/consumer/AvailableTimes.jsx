import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

const AvailableTimes = ({selectedServiceId, setSelectedServiceId, availableTimes, setAvailableTimes, selectedTimeId, setSelectedTimeId}) => {
    // const [serviceTimes, selectTime] = useState("choose a time");
    const fetchData = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/reservations/timeslots:${selectedServiceId}`);
        const array = await response.json();
        console.log(array);
        setAvailableTimes(array)
  } catch (error) { 
        console.error(error);
        };
    }


    useEffect(() => {
        //fetchData();
    }, [selectedServiceId])


    const handleTime = (event) => {
        setSelectedTimeId(event.target.value); // value 
      }

    return (
      <div className = 'listOfTimes'>
      <Select
        value={selectedTimeId}
        onChange={handleTime}
        sx={{
          bottom: 30,
          width: 250,
          height: 50,
        }}
      > {availableTimes?.map((times, index) => (
          <MenuItem key={index} value={times}>{times}</MenuItem>
      ))}
      </Select>
    </div>
    )
};
  
export default AvailableTimes;