import React from 'react';
import './App.css';
import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import SearchView from './view/search/SearchView';
import ResultView from './view/result/ResultView';
import ScrollToTop from './components/ScrollToTop'

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Router>
          <ScrollToTop>
            <Switch>
              <Route exact path='/' component={SearchView} />
              <Route exact path='/result' component={ResultView} />
            </Switch>
          </ScrollToTop>
        </Router>
      </div>
    );
  }

}
