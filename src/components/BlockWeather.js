import React, {useState} from 'react';
import '../assets/css/weather.css'
import location from '../assets/icons/location.png'
import MyImage from "./MyImage";
import clsx from "clsx";
import condition, {conditionRain, conditionCloudy} from "../assets/js/condition";
import winds from "../assets/js/winds";
import SelectCity from "./SelectCity";
import TempMinMax from "./TempMinMax";

const BlockWeather = ({
                          currentTemp, // текущая температура
                          currentCondition, // состояние неба
                          windDir, // сторона ветра
                          windSpeed, // скорость ветра
                          changeLocation, // функция изменения локации
                          dayHours, // массив с данными погоды на каждый час дня
                          tomorrowDayHours, // массив с данными погоды на каждый час следующего дня
                          tomorrowCondition // состояние неба на затрашний день днём
                      }) => {
    let [currentWeather, setCurrentWeather] = useState({
        currentTemp,
        currentCondition,
        windDir,
        windSpeed,
        dayHours,
        tomorrowDayHours,
        tomorrowCondition
    })

    const newData = ({
                         currentTemp,
                         currentCondition,
                         windDir,
                         windSpeed,
                         lat,
                         lon,
                         tomorrowCondition,
                         dayHours,
                         tomorrowDayHours
                     }) => {
        setCurrentWeather({
            ...currentWeather,
            currentTemp,
            currentCondition,
            windDir,
            windSpeed,
            tomorrowCondition,
            dayHours,
            tomorrowDayHours
        })
        changeLocation(lat, lon)
    }

    return (
        <div>
            <div className={clsx({
                "weather": true,
                "weather_1": conditionCloudy().hasOwnProperty(currentWeather.currentCondition),
                "weather_2": currentWeather.currentCondition === "clear",
                "weather_3": conditionRain().hasOwnProperty(currentWeather.currentCondition)
            })}>
                <div className="weather__col_1">
                    <div className="weather__city">
                        <img src={location} alt="Error"/>
                        <SelectCity newData={newData}/>
                    </div>
                    <MyImage condition={currentWeather.currentCondition}/>
                    <div className="weather__status_text">
                        {condition[currentWeather.currentCondition]}
                    </div>
                </div>

                <div className="weather__col_2 temp">
                    <div className="temp__now">
                        {currentWeather.currentTemp}
                    </div>
                    <div>
                        <TempMinMax dayHours={currentWeather.dayHours}/>
                    </div>
                    <div className="weather__wind">
                        {winds[currentWeather.windDir]} {currentWeather.windSpeed} м/с
                    </div>
                </div>

                <div className="weather__col_3 tomorrow">
                    <p className="tomorrow__text">Завтра</p>
                    <TempMinMax dayHours={currentWeather.tomorrowDayHours}/>
                    <div className="weather__status_text">
                        днём ожидается <br/> {condition[currentWeather.tomorrowCondition]}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlockWeather;
