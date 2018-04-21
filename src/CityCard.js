import React, { Component } from 'react';

//Material UI
import {Card, CardText} from 'material-ui/Card';

//Feeds
import CityWeather from './Weather.js';
import NewsFeed from './NewsFeed.js';

import './css/CityCard.css';

class CityCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="City">
                <CardText>
                    <div className="Weather">
                        <CityWeather city={this.props.city} timeZone={this.props.timeZone}/>
                    </div>
                    <div className="News">
                        <div className="News-header">News</div>
                        <div className="News-text">
                            <NewsFeed city={this.props.city} articles="3"/>
                        </div>
                    </div>
                </CardText>
            </Card>
        );
}
}

export default CityCard;