import React, { Component } from 'react';

//Material UI
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

//Feeds
import CityCard from './CityCard.js';

import logo from './Sun.png';
import './App.css';
//import * as config from './config.js'


class App extends Component {

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <AppBar title="DieWetter" />
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">DieWetter</h1>
            </header>

            <body>
              <CityCard city="Berlin"/>
              <CityCard city="San Francisco"/>
            </body>

          </div>
        </MuiThemeProvider>

    );
  }
}

export default App;
