import React, { Component } from 'react';
import { VictoryChart, VictoryLine } from 'victory';

//Material UI
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Comparisoncard extends Component {
    constructor(props) {
        super(props);
    }
//ich kann diese card uebernehmen aber wenn du magst kannst du mit Victory rumspeiel
//Wollte mal nen anderes tool als chart.js und so benutzen fuer die graphen
    render() {
        return (
            <Card>
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

export default Comparisoncard;