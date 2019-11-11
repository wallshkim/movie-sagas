import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class MovieItem extends Component {

    // Dispatch action to selectedMovieSaga & selectedMovieGenresSaga to get specific movie details
    // Then route to /details/:id page
    infoClick = (id) => {
        console.log('info icon clicked with id: ', id);
        this.props.dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
        this.props.history.push(`/details/${id}`);
    }

    render() {

        let movie = this.props.movie;

        return (

            <Grid key={movie.id} className="MovieItem-Card">
                <Card id={movie.id} key={movie.id} >
                    <CardContent >
                        <CardMedia
                            className="MovieItem-Poster"
                            component="img"
                            alt={movie.title}
                            height="260"
                            image={movie.poster}
                            title={movie.title}
                        />
                        <div className="MovieItem-Icon">
                            <CardActions>
                                <IconButton onClick={() => this.infoClick(movie.id)} aria-label={`info about ${movie.title}`} >
                                    <InfoIcon />
                                </IconButton>
                            </CardActions>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(MovieItem));
