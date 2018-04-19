import React, { Component } from 'react';
import axios from 'axios';

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
                        source: article.source.id,
                        title: article.title,
                        description: article.description,
                    };
                    currentNews.push(newArticle)
                });
                context.setState({ currentNews });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return (
            this.state.currentNews.length > 0 &&
            this.state.currentNews.map((article, index) =>
                (
                    <div key={index} className="cityNews">
                    <div className="cityNews_title">{article.title} {article.source && <span className="cityNews_source">{article.source}</span>}</div>
                    <div className="cityNews_description">{article.description}</div>
                    </div>
                ))
        );
    }
}

export default NewsFeed;