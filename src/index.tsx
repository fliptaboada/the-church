import 'normalize-css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureServiceWorker from './configureServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

configureServiceWorker();
