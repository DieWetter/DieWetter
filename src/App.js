import React, { Component } from 'react';
import CityWeather from './Weather.js';
import NewsFeed from './NewsFeed.js';
import logo from './Sun.png';
import './App.css';
//import * as config from './config.js'


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DieWetter</h1>
        </header>
          <CityWeather city="Berlin"/>
          <hr />
          <CityWeather city="San Francisco"/>
          <NewsFeed city="Berlin"/>
          <NewsFeed city="San Francisco"/>
      </div>
    );
  }
}

export default App;
