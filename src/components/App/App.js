import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList';
import { HashRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <p>Empty Page</p>
          {/* <Route path="/" exact component={MovieList} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
