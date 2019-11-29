import React from 'react'

const Weather = ({capital, temperature, icon, windSpeed, windDirection}) => <div>
    <h1>{`Weather in ${capital}`}</h1>
    <b>temperature:</b> {`${temperature} Celsius`}
    <div>
        <img src={icon} />
    </div>
    <b>wind:</b> {`${windSpeed} kph direction ${windDirection}`}
</div>

export default Weather