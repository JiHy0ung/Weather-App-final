import React from 'react'

const WeatherButtons = ({ cities, changeCity, city }) => {
  return (
    <div>
      <div className="buttons">
        {cities.map((item, index) => (
          <button
            className={`button-shadow ${city === item ? 'active' : ''}`}
            key={index}
            onClick={() => changeCity(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="cur-btn">
        <button className={`cur-btn-shadow ${city === null ? 'active' : ''}`}
          onClick={() => changeCity("current")}>
          현재위치
        </button>
      </div>  
    </div>
  );
};

export default WeatherButtons;
