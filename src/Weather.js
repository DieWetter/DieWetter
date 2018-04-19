import React, { Component } from 'react';
import axios from 'axios';

// get weather information for a given city
class CityWeather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWeatherData: {},
        };

        this.fetchWeather = this.fetchWeather.bind(this);
    }

    componentDidMount() {
        this.fetchWeather(this.props.city);
    }

    fetchWeather(city) {
        let context = this;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(function (response) {
                let currentWeatherData = Object.assign({}, context.state.currentWeatherData);
                console.log(currentWeatherData);
                //create utils function for turning Kelvin into Celsius
                currentWeatherData['temp'] = (response.data.main.temp - 273.15).toFixed(0);
                context.setState({ currentWeatherData });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return ( Object.keys(this.state.currentWeatherData).length > 0 &&
            <div className="CityWeatherDetails">
                The weather in {this.props.city} is currently {this.state.currentWeatherData.temp} °C
            </div>
        );
    }
}

export default CityWeather;