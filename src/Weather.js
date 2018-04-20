import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

//Material UI
import {Card, CardHeader, CardText} from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

import './Weather.css';

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
                console.log(response);
                let currentWeatherData = Object.assign({}, context.state.currentWeatherData);
                currentWeatherData['temp'] = (response.data.main.temp - 273.15).toFixed(0);
                currentWeatherData['weather'] = response.data.weather[0].description;
                currentWeatherData['sunrise'] = response.data.sys.sunrise;
                currentWeatherData['sunset'] = response.data.sys.sunset;
                currentWeatherData['humidity'] = response.data.main.humidity;
                currentWeatherData['cloudiness'] = response.data.clouds.all;
                currentWeatherData['windyness'] = response.data.wind.speed;
                context.setState({ currentWeatherData });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return ( Object.keys(this.state.currentWeatherData).length > 0 &&
            <Card 
                className="CityWeatherDetails" 
                style={this.props.city === "Berlin" ? {background:"url(http://res.cloudinary.com/dkchqxebb/image/upload/e_blur:300/v1524252603/Web-The-Brandenburg-Gate-Berlin.jpg)"}:{background:"url(http://lmrei.com/wp-content/themes/Latitude%20Theme/img/GoldenGateBlur.jpg)"}}>
                <CardHeader
                    className="CityWeatherDetails_Header"
                    title={this.props.city}
                    subtitle={this.props.city === "Berlin" ? moment().add(9, "hours").format("MMMM Do") : moment().format("MMMM Do")}
                />
                <CardText>
                    <div>
                        <div className="CityWeatherDetails_Temp">{this.state.currentWeatherData.temp} °C</div>
                    </div>
                    <div className="CityWeatherDetails_extra">
                    {/* <List>
                        <ListItem>
                            <ListItemText primary="Cloudy" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Sunset"/>
                        </ListItem>
                    </List> */}
                    Cloudy: {this.state.currentWeatherData.cloudiness}%<br/>
                    Humidity: {this.state.currentWeatherData.cloudiness}%<br/>
                    Wind: {this.state.currentWeatherData.windyness}m/s<br/>
                    Sunset: {moment(this.state.currentWeatherData.sunset).format("h:mm:ss a")}<br/>
                    Sunrise: {moment(this.state.currentWeatherData.sunrise).format("h:mm:ss a")}

                    </div>
                </CardText>
            </Card>
        );
    }
}

export default CityWeather;