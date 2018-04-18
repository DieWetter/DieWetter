import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
//import * as config from './config.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemperatures: {},
    };

    this.fetchWeather = this.fetchWeather.bind(this);
  }

  componentDidMount() {
    this.fetchWeather('Berlin');
    this.fetchWeather('San Francisco');
  }

  fetchWeather(city) {
    let context = this;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(function (response) {
      let currentTemperatures = Object.assign({}, context.state.currentTemperatures);
      console.log(currentTemperatures);
      currentTemperatures[city] = (response.data.main.temp - 273.15).toFixed(2);
      context.setState({ currentTemperatures });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          The weather in Berlin is currently {this.state.currentTemperatures['Berlin']} °C
          <hr/>
          The weather in San Francisco is currently {this.state.currentTemperatures['San Francisco']} °C
        </div>
      </div>
    );
  }
}

export default App;
