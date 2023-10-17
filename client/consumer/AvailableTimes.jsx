import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

const AvailableTimes = ({selectedServiceId, setSelectedServiceId, availableTimes, setAvailableTimes, selectedTimeId, setSelectedTimeId}) => {
    // const [serviceTimes, selectTime] = useState("choose a time");


    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`localhost:3000/api/reservations/timeslots:${selectedService}`);
            const array = await response.json();
            console.log(array);
            setAvailableTimes(array)
      } catch (error) { 
            console.error(error);
            };
        }
        fetchData();
    }, [selectedService])

    const handleTime = (event) => {
        selectTime(event.target.time); // value 
      }

    return (
      <div className = 'listOfTimes'>
      <Select
        times={serviceTimes}
        onChange={handleTime}
        sx={{
          marginTop: 30,
          width: 250,
          height: 50,
        }}
      > {serviceTimes?.map((times, index) => (
          <MenuItem key={index} value={times}>{times}</MenuItem>
      ))}
      </Select>
    </div>
    )
};
  
export default AvailableTimes;