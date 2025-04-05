/* eslint-disable react-hooks/exhaustive-deps */
/*
  2025년 04월 04일 금요일
  작성자: 유지형
  제목: 날씨앱
  내용:
  1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보임.
  2. 날씨 정보 - > 섭씨, 화씨 날씨 상태.
  
  3. 5개의 버튼 (1개는 현재 위치, 4개는 다른 도시).
  4. 도시 버튼을 클릭 할 때마다 해당 도시의 날씨가 나옴.
  5. 현재 위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴.
  6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
*/

import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButtons from './component/WeatherButtons';
import ClipLoader from "react-spinners/ClipLoader";
import { getWeatherCategory } from './utils/weatherKor';

const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const cities = ["Bangkok", "Hawaii", "Paris", "Tokyo"];


function App() {
  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);

  const type = weather ? getWeatherCategory(weather.weather[0].id) : "";


  const getWeatherByCurrentLocation = async(lat, lon) =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  }

  const getCurrentLocation = () =>{
    
    // 현재 경도, 위도 가져오기
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  } 

  const getWeatherByCity = async() =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
  }

  function getWeatherMessage(weather) {
    if (!weather) return "";
  
    const temp = weather.main?.temp;
    const id = weather.weather?.[0]?.id;
  
    if(id >= 200 && id < 600) {
      return "비가 주륵주륵, 우산을 챙기세요!";
    }
    if(id >= 600 && id < 700) {
      return "눈이 펑펑, 따뜻하게 입고 나가세요!";
    }
    if(id >= 700 && id < 800){
      return "안개가 꼈어요, 운전에 주의하세요!";
    }
    if(id >= 804 && id < 900) {
      return "날씨가 흐려요, 기분전환을 해보는 건 어때요?";
    }
    if((id >= 900 && id < 903) && (id >= 957 && id <= 962)){
      return "날씨가 심상치 않아요, 외출을 삼가하세요!";
    }
    if(temp <= 0) {
      return "기온이 영하예요, 따뜻하게 입으세요!";
    }
    if(temp >= 15 && temp <= 26 && id >= 800 && id < 804){
      return "날이 좋네요, 외출을 해보는 건 어떤가요?"
    }
    if(temp >= 30) {
      return "날이 매우 더워요, 수분 섭취를 잊지 마세요!";
    }
    return "오늘도 좋은 하루 보내세요, 화이팅!";
  }

  const changeCity = (city) => {

    if (city === "current") {

      setCity(null);

    } else {

      setCity(city);

    }

  }

  useEffect(()=>{

    if(city == null){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }

  }, [city, getCurrentLocation, getWeatherByCity]);

  return (
    <div className = {`${type}`}>
        <div className = "container">
        <div className = "a"> 
          {loading?
          <ClipLoader
            color = "#ffffff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          :
          <>
          <div className = "box">
          
            <WeatherBox weather = {weather} loading = {loading}/>

          </div>
          <div className="w-msg">
            {getWeatherMessage(weather)}
          </div>
          <WeatherButtons cities = {cities} changeCity = {changeCity}/>
          </>
          
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
