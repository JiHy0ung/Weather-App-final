import React from 'react'
import { wDescEngToKor } from '../utils/weatherKor'
import cityNameMap from '../utils/cityKor'


const WeatherBox = ({weather}) => {

    const cityNameKor = cityNameMap[weather?.name] || weather?.name;

  return (
    <div>
        <div className = "weather">
            <h5 className = "place">
                {/* 챗지피티를 통해 국내외도시 이름들을
                    영어에서 한글로 맵핑하는 파일을 제공받아
                    배포 사이트에서 한글로 보이도록 함.
                */}
                {cityNameKor}
            </h5>
            <h3 className = "temp">
                {/* 간단하게 소수점 첫째자리까지만 보이도록 함. */}
                {weather?.main.temp.toFixed(1)}℃ / {(weather?.main.temp * (9 / 5) + 32).toFixed(1)}℉
            </h3>
            <h3 className = "sky">
                {wDescEngToKor(weather?.weather[0]?.id)}
            </h3>
        </div>
    </div>
  )
}

export default WeatherBox