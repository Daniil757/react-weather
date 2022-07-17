import React from 'react';
import cloudy from "../assets/icons/cloudy.png";
import rain from "../assets/icons/rain.png";
import sun from "../assets/icons/sun.png";
import {conditionRain, conditionCloudy} from "../assets/js/condition";

const MyImage = ({condition}) => {
    return (
        <div className="weather__status">
            {
                conditionCloudy().hasOwnProperty(condition) && <img src={cloudy} alt="Error"/>
            }
            {
                conditionRain().hasOwnProperty(condition) && <img src={rain} alt="Error"/>
            }
            {
                condition === "clear" && <img src={sun} alt="Error"/>
            }
        </div>
    );
};

export default MyImage;
