import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CityCard from './CityCard';
import Button from './Button';
import CityGraph from './CityGraph';

export default function Forecast(props) {
   const [responseObj, setResponseObj] = useState({});
   const [cityCards, setCityCards] = useState([])
   const [input, setInput] = useState('');
   const [error, setError] = useState(false);
   const [isLoading, setLoading] = useState(false);

   const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`;

   function getForecast(event) { 
        setLoading(true);
        fetch(URL)
            .then(response => response.json())
            .then(data => {
            setCityCards((cityList) => [data, ...cityList]);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
  };

  const onSubmit = (e) => {
    getForecast();
    e.preventDefault();
  };

  const deleteCity = (id) => {
    setCityCards((cityList) => {
      cityList = cityList.filter((card) => card.id !== id);
      return cityList;
    });
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <h1>Weather</h1>
            <form onSubmit={getForecast}>
              <input
                  className="Input"
                  type="text"
                  placeholder="Search City"
                  value={input}
                  onChange={handleChange}
                  required="required"/>
              <Button onSubmit={onSubmit} disabled={!input}/>
          </form>
          {cityCards.length !== 0 && cityCards.map((item) => (
          <div key={item.id}>
              <CityCard responseObj={item} deleteCity={deleteCity}/>
          </div>
          ))} {isLoading &&
          <p>
              Loading {input} weather ...
          </p>} {error &&
          <p>
              Uppss!
          </p>}
        </div>
        </Route>
        <Route path="/:cityId">
          <CityGraph />
        </Route>
      </Switch>
    </Router>
    
  )
}
