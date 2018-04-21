import React, { Component } from 'react';
import { VictoryChart, VictoryLine } from 'victory';

//Material UI
import {Card, CardHeader, CardText} from 'material-ui/Card';

import './css/ComparisonCard.css';

class ComparisonCard extends Component {
    constructor(props) {
        super(props);
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
                    <VictoryChart>
                        <VictoryLine 
                            data={this.props.data}
                            interpolation="natural"
                         />
                        <VictoryLine 
                            data={this.props.data}
                         />
                    </VictoryChart>
                </CardText>
            </Card>
        );
}
}

export default ComparisonCard;