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
        this.fetchNews(this.props.city);
    }

    fetchNews(city) {
        let context = this;
        axios.get(`https://newsapi.org/v2/top-headlines?q=${city}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
            .then(function (response) {
                console.log(response.data.articles);
                let currentNews = [...context.state.currentNews];
                (response.data.articles).forEach((article) => {
                    let newArticle = {
                        author: article.author,
                        title: article.title,
                        description: article.description,
                    };
                    currentNews.push(newArticle)
                })
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
                        {article.author && <div className="cityNews_author">{article.author}</div>}
                        <div className="cityNews_title">{article.title}</div>
                        <div className="cityNews_description">{article.description}</div>
                        <hr/>
                    </div>
                ))
        );
    }
}

export default NewsFeed;