import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryLegend, VictoryAxis } from 'victory';
import axios from 'axios';
import moment from 'moment-timezone';

//Material UI
import {Card, CardHeader, CardText} from 'material-ui/Card';

import './css/ComparisonCard.css';

class ComparisonCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: {},
            forecast5Days: {},
        };
        this.get5DayForecast = this.get5DayForecast.bind(this);
        this.calc5Days = this.calc5Days.bind(this);
    }

    componentDidMount() {
        this.get5DayForecast(this.props.cities[0], 0);
        //this.get5DayForecast(this.props.cities[1], 1);
    }

    calc5Days() {
        let dayWeather = {};
        for(let key in this.state.forecast) {
            this.state.forecast[key].forEach((item) => {
                if(!dayWeather[item.date.split(' ')[0]]) {
                    dayWeather[item.date.split(' ')[0]] = Number(item.temp_min);
                }
                dayWeather[item.date.split(' ')[0]] = (Number(dayWeather[item.date.split(' ')[0]]) + Number(item.temp_min)) / 2
            })
        }
        let forecast5Days = dayWeather;
        this.setState({ forecast5Days });
    }

    get5DayForecast(city, timeID) {
        //api.openweathermap.org/data/2.5/forecast?id={city ID}
        let context = this;
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(function (response) {
            console.log(response);
            let forecast = Object.assign({}, context.state.forecast);
            forecast[city] = [];
            response.data.list.forEach((item) => {
                let entry = {};
                entry.date = moment.tz(item.dt*1000, context.props.timeZones[timeID]).format("dddd h:mm a");
                entry.temp_min = (item.main.temp_min-273.15).toFixed(0);
                entry.temp_max = (item.main.temp_max-273.15).toFixed(0);
                forecast[city].push(entry);
            })
            context.setState({ forecast }, ()=>context.calc5Days());

        })
        .catch(function (error) {
            console.log(error);
        });
    }
//ich kann diese card uebernehmen aber wenn du magst kannst du mit Victory rumspeiel
//Wollte mal nen anderes tool als chart.js und so benutzen fuer die graphen
    render() {
        return (
            <Card className = "Comparison">
                <CardHeader
                    title={`${this.props.cities[0]} VS ${this.props.cities[1]}`}
                    titleColor={"white"}
                    titleStyle={{textAlign: "center"}}
                />
                <CardText>
                    <VictoryChart style={{data:{fill:"white"}}}>
                    <VictoryLegend x={125} y={50}
                        centerTitle
                        orientation="horizontal"
                        data={[
                            { name: this.props.cities[0], symbol: { fill: "gold" } },
                            { name: this.props.cities[1], symbol: { fill: "tomato" } },
                        ]}
                    />
                        <VictoryLine
                            interpolation="linear"                        
                            style={{
                                data: { stroke: "#c43a31" },
                                parent: { border: "1px solid #ccc"}
                            }}
                            data={this.state.forecast["Berlin"]}
                            x="date"
                            y="temp_min"
                        />
                    </VictoryChart>
                </CardText>
            </Card>
        );
}
}

export default ComparisonCard;