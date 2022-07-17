import React, {useState} from 'react';
import axios from "axios";
import countries from "../assets/js/countries";

const SelectCity = (props) => {
    const [city, setCity] = useState('sharkan');
    const changeCity = (currentCity) => {
        setCity(currentCity)
        axios.get(`http://localhost:8010/proxy?lat=${countries[currentCity][0]}&lon=${countries[currentCity][1]}&lang=ru_RU`, {
            headers: {
                "X-Yandex-API-Key": "cdf6e5c3-9ea3-4b31-8892-7e94a538a3e1"
            }
        }).then(response => {
            return (
                props.newData({
                    "currentTemp":response.data.fact.temp, // текущая температура
                    "currentCondition":response.data.fact.condition, // состояние неба
                    "windDir":response.data.fact.wind_dir, // сторона ветра
                    "windSpeed":response.data.fact.wind_speed, // скорость ветра
                    "lat": countries[currentCity][0], // новая широта
                    "lon":countries[currentCity][1], // новая долгота
                    "dayHours": response.data.forecasts[0].hours, // массив с данными погоды на каждый час дня
                    "tomorrowDayHours": response.data.forecasts[1].hours, // массив с данными погоды на каждый час следующего дня
                    "tomorrowCondition": response.data.forecasts[1].parts.day.condition // состояние неба на затрашний день днём
                })
            )
        })
    }
    return (
        <select className="weather__city_select" value={city} onChange={event => changeCity(event.target.value)}>
            <option value="sharkan">Шаркан</option>
            <option value="votkinsk">Воткинск</option>
            <option value="izhevsk">Ижевск</option>
        </select>
    );
};

export default SelectCity;
