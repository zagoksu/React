import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function CityCard(props) {
    if (props.responseObj.cod !== 200) {
        return <p> Please enter a valid city name! </p>;
      } else {
        
    return (
            <div className="cityBox">
                <div className="city">
                <div
                    className="close-city" onClick={() => { props.deleteCity(props.responseObj.id);}}
                    >
                    <i className="fa fa-times-circle fa-2x"></i>
                    </div>
                    <h2>
                        <Link to={'/' + props.responseObj.id}>
                        {props.responseObj.name}, {props.responseObj.sys.country}
                        </Link>
                    </h2>
                    <div className="weather">
                        <h3>{props.responseObj.weather[0].main}</h3>
                        <p className='description'>{props.responseObj.weather[0].description}</p>
                    </div>
                    <div className='temperature'>
                        <p>min temp: {props.responseObj.main.temp_min } °C</p>
                        <p>max temp: {props.responseObj.main.temp_max } °C</p>
                        <p>location: {props.responseObj.coord.lon}, {props.responseObj.coord.lat}</p>
                    </div>
            </div>
        </div>
        )
   }
}