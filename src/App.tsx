import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import AddForm from './features/AddForm';
import TrackerList from './features/TrackerList';
import Stats from './features/Stats';
import Header from './ui/Header';

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={TrackerList} />
          <Route path="/add" component={AddForm} />
          <Route path="/stats" component={Stats} />
        </Switch>
      </>
    </Router>
  );
};

export default App;
