import React, { Component } from 'react';
import axios from 'axios';

//Material UI
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Grid from 'material-ui-next/Grid';
import Icon from 'material-ui-next/Icon';
import Button from 'material-ui-next/Button';
import MobileStepper from 'material-ui-next/MobileStepper';

import './css/NewsFeed.css';

//create stepper to display news feed
class NewsStepper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeNews: 0,
        };

        this.showArticleContent = this.showArticleContent.bind(this);
    }

    nextNews = () => {
        this.setState({
            activeNews: this.state.activeNews + 1,
        });
    };

    prevNews = () => {
        this.setState({
            activeNews: this.state.activeNews - 1,
        });
    };

    //needs rework! ###################################
    showArticleContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Grid container className="News-container">
                        <Grid item xs={6} sm={4} md={8}>
                            <Chip>
                                <Avatar icon={<FontIcon className="material-icons">language</FontIcon>} />
                                Article source
                            </Chip>
                        </Grid>
                        <Grid item xs={6} sm={4} md={4}>
                            <Button className="News-button" /*onClick={() => {window.open(article.url)}}*/ variant="raised">
                                <Icon className="material-icons">import_contacts</Icon> Read
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="CityNews-title">title</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="CityNews-description">description</div>
                        </Grid>
                    </Grid>
                );
            case 1:
                return "No news";
            case 2:
                return "No news";
        }
    }
    render() {
        return (
            <div>
                <MobileStepper
                    variant="dots"
                    steps={3}
                    position="static"
                    activeStep={this.state.activeNews}
                    className="News-stepper"
                    nextButton={
                        <Button size="small" onClick={this.nextNews} disabled={this.state.activeNews === 2}>Next <Icon className="material-icons">keyboard_arrow_right</Icon></Button>
                    }
                    backButton={
                    <Button size="small" onClick={this.prevNews} disabled={this.state.activeNews === 0}><Icon className="material-icons">keyboard_arrow_left</Icon> Previous</Button>
                    }
                />
                <div>{this.showArticleContent(this.state.activeNews)}</div>
            </div>
        );
    }
}

// get weather information for a given city
class NewsFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentNews: [],
        };

        this.fetchNews = this.fetchNews.bind(this);
    }

    componentDidMount() {
        this.fetchNews(this.props.city, this.props.articles);
    }

    fetchNews(city, articleNumber) {
        let context = this;
        axios.get(`https://newsapi.org/v2/top-headlines?q=${city}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
            .then(function (response) {
                console.log(response.data.articles);
                let currentNews = [...context.state.currentNews];
                (response.data.articles).slice(0,articleNumber).forEach((article) => {
                    let newArticle = {
                        sourceName: article.source.name,
                        url: article.url,
                        title: article.title,
                        description: article.description,
                    };
                    currentNews.push(newArticle);
                });
                context.setState({ currentNews });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return (
            <div>
                <NewsStepper/>
            </div>

            //needs to be implemented into stepper ################
            /*this.state.currentNews.length > 0 &&
            this.state.currentNews.map((article, index) =>
                (
                    <div key={index} className="CityNews">
                        <Grid container>
                            <Grid item xs={6} sm={4} md={8}>
                                <Chip>
                                    <Avatar icon={<FontIcon className="material-icons">language</FontIcon>} />
                                    {article.sourceName}
                                </Chip>
                            </Grid>
                            <Grid item xs={6} sm={4} md={4}>
                                <Button className="News-button" onClick={() => {window.open(article.url)}} variant="raised">
                                    <Icon className="material-icons">import_contacts</Icon> Read
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="CityNews-title">{article.title}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="CityNews-description">{article.description}</div>
                            </Grid>
                        </Grid>
                    </div>
                ))*/
        );
    }
}

export default NewsFeed;