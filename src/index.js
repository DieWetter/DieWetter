import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const isMobile = window.innerWidth < 480;

ReactDOM.render(<App isMobile={isMobile}/>, document.getElementById('root'));
registerServiceWorker();
