import React, { Component } from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';

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
  
  render() {
    return (
      (!this.props.isMobile ?
        // Render for device above 480 width
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
                  <ComparisonCard data={this.state.data} cities={this.state.cities} timeZones={["Europe/Berlin", "America/Los_Angeles"]} />
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="city_card">
                  <CityCard city="San Francisco" timeZone="America/Los_Angeles"/>
                </div>
              </Grid>
            </Grid>

          </div>
        </MuiThemeProvider>
      :   
      // Render for Mobile device below 480 width
        <MuiThemeProvider>
          <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="App-title">DieWetter</span>
          </header>

          <Grid container spacing={0}>
            <SwipeableViews>
            <Grid item xs={12}>
              <div style={{"color":"white"}} className="city_card">
                <CityCard city="Berlin" timeZone="Europe/Berlin"/>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="comparison_card">
                <ComparisonCard data={this.state.data} cities={this.state.cities} timeZones={["Europe/Berlin", "America/Los_Angeles"]} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="city_card">
                <CityCard city="San Francisco" timeZone="America/Los_Angeles"/>
              </div>
            </Grid>
            </SwipeableViews>
          </Grid>

          </div>
        </MuiThemeProvider>)
    );
  }
}

export default App;
