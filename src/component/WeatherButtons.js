import React from 'react'
import { Button } from 'react-bootstrap';



const WeatherButtons = () => {
  return (
    <div className = "buttons">
        <Button variant="outline-light" className = "button-shadow">Current Location</Button>
        <Button variant="outline-light" className = "button-shadow">Seoul</Button>
        <Button variant="outline-light" className = "button-shadow">Tokyo</Button>
        <Button variant="outline-light" className = "button-shadow">Hawaii</Button>
    </div>
  )
}

export default WeatherButtons