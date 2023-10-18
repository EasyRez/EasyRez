import React from 'react';
import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import styles from '../styles.scss';

const AvailableTimes = ({selectedServiceId, setSelectedServiceId, availableTimes, setAvailableTimes, selectedTimeId, setSelectedTimeId}) => {
    // const [serviceTimes, selectTime] = useState("choose a time");
    const fetchData = async () => {
      if(selectedServiceId){
        try {
          const response = await fetch(`http://localhost:3000/api/reservations/timeslots/${selectedServiceId}`); // : before selectedServiceId?
          const array = await response.json();
          setAvailableTimes(array)
          console.log(array);
        } catch (error) { 
          console.error(error);
          };
      }
    }


    useEffect(() => {
        fetchData(); //uncomment to fetch times
    }, [selectedServiceId])


    const handleTime = (event) => {
        setSelectedTimeId(event.target.value); // value 
      }

    let timeOptions;

    if (availableTimes){
      console.log('available times: ', availableTimes);
      timeOptions = availableTimes.map((timeslot, index) => {
        return (<MenuItem key={index} value={timeslot.timeslot_id}>{timeslot.start_time}</MenuItem>)
      })
    }


    return (
      <div className= 'listOfTimes'>
      <Select
        value={selectedTimeId}
        onChange={handleTime}
        sx={{
          bottom: 30,
          width: 250,
          height: 50,
        }}
      > 
      {timeOptions}
      </Select>
    </div>
    )
};
  
export default AvailableTimes;