import React, {useEffect, useState} from "react";
import './assets/css/app.css'
import BlockWeather from "./components/BlockWeather";
import axios from "axios";

function App() {
    let [data, setData] = useState('')
    let [location, setLocation] = useState({
        "lat": 57.29885,
        "lon": 53.87122
    })

    const getData = (lat, lon) => {
        axios.get(`http://localhost:8010/proxy?lat=${lat}&lon=${lon}&lang=ru_RU`, {
            headers: {
                "X-Yandex-API-Key": "cdf6e5c3-9ea3-4b31-8892-7e94a538a3e1"
            }
        }).then(response => setData(response.data))
    }

    useEffect(() => {
        getData(location.lat, location.lon)
        setInterval(() => getData(location.lat, location.lon), 60000)
    }, [location]);

    const changeLocation = (lat, lon) => {
        setLocation({lat, lon})
        // getData(lat, lon)
    }

    return (
        <div className="container">
            {data ? <div className="container__weather">
                <BlockWeather currentTemp={data.fact.temp} // текущая температура
                              currentCondition={data.fact.condition} // состояние неба
                              windDir={data.fact.wind_dir} // сторона ветра
                              windSpeed={data.fact.wind_speed} // скорость ветра
                              changeLocation={changeLocation} // функция изменения локации
                              dayHours={data.forecasts[0].hours} // массив с данными погоды на каждый час дня
                              tomorrowDayHours={data.forecasts[1].hours} // массив с данными погоды на каждый час следующего дня
                              tomorrowCondition={data.forecasts[1].parts.day.condition} // состояние неба на затрашний день днём
                />
            </div> : ''}
        </div>
    );
}

export default App;
