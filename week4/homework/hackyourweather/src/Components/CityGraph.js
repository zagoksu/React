import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useParams, Link } from 'react-router-dom';

export default function CityGraph() {
    const [city, setCity] = useState({});
    const [cityData, setCityData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const { cityId } = useParams();

    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    useEffect(() => {
        const getForecastData = () => {
            const URL = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&appid=${API_KEY} `;
            setLoading(true);
            fetch(URL)
              .then(response => response.json())
              .then(data => {
                setCityData(data.list);
                setCity(data.city);
                setLoading(false);
              })
              .catch(err => {
                setLoading(false);
                setError(true);
              })
            }
          
            getForecastData();
          }, [cityId])
    
      return (
        <div>
          <h2><strong> 5 day Forecast</strong></h2>
          {city && (
            <h3>
              {city.name}, {city.country}
            </h3>
          )}
          {hasError && <p> Upps!.. </p>}
          {isLoading && <div class="spinner-border"></div>}
          {cityData && (
            <AreaChart
              width={700}
              height={550}
              data={cityData}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="dt_txt" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" name="temp" dataKey="main.temp" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          )}
          <h4>
            <Link to="/"> Go Back!</Link>
          </h4>
        </div>
      );
}