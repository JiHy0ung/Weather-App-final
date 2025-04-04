/*
  2025년 04월 04일 금요일
  작성자: 유지형
  제목: 날씨앱
  내용:
  1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보임.
  2. 날씨 정보 - > 섭씨, 화씨 날씨 상태
  
  3. 5개의 버튼 (1개는 현재 위치, 4개는 다른 도시)
  4. 도시 버튼을 클릭 할 때마다 해당 도시의 날씨가 나옴.
  5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴.
  6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
*/

import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButtons from './component/WeatherButtons';

function App() {
  
  const [weather, setWeather] = useState(null);

  useEffect(()=>{

    getCurrentLocation()

  }, [])

  const getCurrentLocation = () =>{
    
    // 현재 경도, 위도 가져오기
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  } 

  const getWeatherByCurrentLocation = async(lat, lon) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0ed1ceeff176e1a5e55937388400772b&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
  }

  return (
    <div>
      <div className = "container">
        <div className = "box">
        <WeatherBox weather = {weather}/>
        <WeatherButtons />
        </div>
      </div>
    </div>
  );
}

export default App;
