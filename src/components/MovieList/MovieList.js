import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import MovieItem from "../MovieItem/MovieItem";

class MovieList extends Component {

    componentDidMount() {
        // Gets movies and holds them in moviesReducer
        this.props.dispatch({ type: 'GET_MOVIES' });
    }

    render() {
        return (
            <div className="MovieList">
                <h1 className="MovieList-Header">Movie Sagas</h1>
                <Grid
                    className="grid"
                    container direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    {/* Map over moviesReducer and pass each movie to MovieDetails */}
                    {this.props.moviesReducer.map(movie => (
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
                </Grid>

                {/* <pre>{JSON.stringify(this.props.movieReducer, null, 2)}</pre> */}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(MovieList);
