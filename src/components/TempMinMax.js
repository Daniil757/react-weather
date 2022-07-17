import React from 'react';

const TempMinMax = ({dayHours}) => {

    let temps = []
    const tempMinMax = (array, start = 0, end = 23) => {
        if (start <= end) {
            temps = [...temps, array[start].temp]
            return tempMinMax(array, start + 1, end)
        }
        return temps
    }

    console.log(tempMinMax(dayHours))
    return (
        <div className="temp__between">
            {Math.min(...tempMinMax(dayHours))} / {Math.max(...tempMinMax(dayHours))}
        </div>
    );
};

export default TempMinMax;
