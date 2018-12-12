import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SearchView from './view/search/SearchView';
import ResultView from './view/result/ResultView';

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/' component={SearchView} />
            <Route exact path='/result' component={ResultView} />
          </Switch>
        </Router>
      </div>
    );
  }

}
