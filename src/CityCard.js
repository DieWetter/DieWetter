import React, { Component } from 'react';

//Material UI
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

//Feeds
import CityWeather from './Weather.js';
import NewsFeed from './NewsFeed.js';

class CityCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.city}
                />
                <CardText>
                    <div className="Weather">
                        <CityWeather city={this.props.city}/>
                    </div>
                    <div className="News">
                        <div className="NewsHeader">News</div>
                        <NewsFeed city={this.props.city} articles="3"/>
                    </div>
                </CardText>
            </Card>
        );
}
}

export default CityCard;