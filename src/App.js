import React, { Component } from 'react';
import axios from 'axios';

//Material UI
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui-next/Grid';

//Feeds
import CityCard from './CityCard.js';
import ComparisonCard from './ComparisonCard.js';

import logo from './img/Sun.png';
import './css/App.css';
//import * as config from './config.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: ["Berlin", "San Francisco"],
      berlinBulkData: [],
      sanFranciscoBulkData: [],
    }
  }
//Kannst du erstmal ignorieren, man kann mit der API nicht kostenlos die daten fuer ein Jahr bekommen
//koennten eventuell nen worker machen und die daten einzeln lange aber das macht kein sinn glaube ich
  // fetchDataBulk(cityID) {
  //   let context = this;
  //   let url = `http://history.openweathermap.org/data/2.5/history/city?id={${cityID}}&type=month&end={${Date.now()}}&cnt={12}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`;
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
  //     .then(function (response) {
  //       let currentWeatherData = Object.assign({}, context.state.currentWeatherData);
  //       console.log(currentWeatherData);
  //       //create utils function for turning Kelvin into Celsius
  //       currentWeatherData['temp'] = (response.data.main.temp - 273.15).toFixed(0);
  //       context.setState({ currentWeatherData });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //   });
  // }

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <span className="App-title">DieWetter</span>
            </header>

            <Grid container spacing={0}>
              <Grid item xs={12} md={4}>
                <div className="city_card">
                  <CityCard city="Berlin" timeZone="Europe/Berlin"/>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="comparison_card">
                  <ComparisonCard data={this.state.data} cities={this.state.cities} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="city_card">
                  <CityCard city="San Francisco"timeZone="America/San_Francisco"/>
                </div>
              </Grid>
            </Grid>

          </div>
        </MuiThemeProvider>

    );
  }
}

export default App;
