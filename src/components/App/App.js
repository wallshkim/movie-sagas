import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import EditDetails from '../EditDetails/EditDetails';
import { HashRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={MovieList} />
          <Route path="/details/:id" component={MovieDetails} />
          <Route path="/edit/:id" component={EditDetails} />
        </div>
      </Router>
    );
  }
}

export default App;
