import React from 'react'
import { Button } from 'react-bootstrap';



const WeatherButtons = ({cities, setCity, changeCity}) => {
  return (
    <div>

      <div className = "buttons">
      {cities.map((item, index) => (
        <Button variant="outline-light" className = "button-shadow" key={index}
        onClick={() => changeCity(item)}>
          {item}
        </Button>
      ))}
      </div>

      <div className = "cur-btn">
        <Button variant="light" className = "cur-btn-shadow"
        onClick = {() => changeCity("current")}>
          현재위치
        </Button>
      </div>  
    
    </div>
  )
}

export default WeatherButtons