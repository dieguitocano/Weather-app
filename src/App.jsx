import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'


function App() {

  
  
  const [latLon, setLatLon] = useState({})
  const [weather, setWeather] = useState({})
  const [degrees, setDegrees] = useState(true)



  useEffect(() => {


    const success = pos => {
      console.log(pos.coords)
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setLatLon({lat, lon})
    }


    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(latLon.lat !== undefined) {

      const API_KEY = 'd1135daf0274cf08c9cfaba0e178ca3a'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon?.lat}&lon=${latLon?.lon}&appid=${API_KEY}`

      axios.get(URL)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
       
    }
    console.log(weather)
  }, [latLon])


  const celFar = () => setDegrees(!degrees)

  const tempt = {
    celcius: `${(weather?.main?.temp - 273.15).toFixed(1)}°C`,
    fahrenheit: `${(weather?.main?.temp )}°F`,
    celMin: `${(weather?.main?.temp_min -273.15).toFixed(1)}°C`,
    celMax: `${(weather?.main?.temp_max -273.15).toFixed(1)}°C`,
    fahMin: `${(weather?.main?.temp_min)}°C`,
    fahMax: `${(weather?.main?.temp_max)}°F`,
    
  }

  console.log(degrees)

  const today = new Date();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let numeroDiaSemana = today.getDay();

  let hours = today.getHours();
  let minutes = today.getMinutes();
  
  minutes = ('0' + minutes).slice(-2)

  let amPm = hours >= 12 ? 'PM':'AM'

  console.log(`Hoy es ${days[numeroDiaSemana]} + ${hours % 12}:${minutes} ${amPm}`)

  console.log(weather)
 console.log(tempt?.celcius, tempt?.fahrenheit)
  return (
  <>
    <div className="App">

      
   
       <div className='container1'> 
          <img src=" http://openweathermap.org/img/wn/10d@2x.png" alt="" />  
         <p>{weather?.name}, {weather?.sys?.country}</p>
         <p> {days[numeroDiaSemana]} {hours %12}:{minutes} {amPm}</p>  
       </div>
       <div className='container2'>
             <ul>    
               <li><a className='temp' href=""> {degrees ? tempt?.celcius : tempt?.fahrenheit}</a></li>
               <li><a href="">Max  {degrees ? tempt?.celMax : tempt?.fahMax}</a></li>
               <li><a href="">Min    {degrees ? tempt?.celMin : tempt?.fahMin}</a></li>
               <li><a href="">Humidity    {weather?.main?.humidity}</a></li>
               <li><a href="">Wind    {weather?.wind?.speed} </a></li>
             </ul>
             <button onClick={celFar}>{degrees ? '°F' : '°C'}</button>
       </div>
          
        
    </div>
  </>

  )
}

export default App
