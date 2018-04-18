import React, { Component } from 'react';
import axios from 'axios';

// get weather information for a given city
class CityWeather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTemperatures: {},
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
                let currentTemperatures = Object.assign({}, context.state.currentTemperatures);
                console.log(currentTemperatures);
                //create utils function for turning Kelvin into Celsius
                currentTemperatures[city] = (response.data.main.temp - 273.15).toFixed(0);
                context.setState({ currentTemperatures });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return (
            <div className="CityWeatherDetails">
                The weather in {this.props.city} is currently {this.state.currentTemperatures[this.props.city]} °C
            </div>
        );
    }
}

export default CityWeather;