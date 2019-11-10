import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


class MovieItem extends Component {

    render() {
        const movie = this.props.movie;
        return (

            <Grid key={movie.id} className="MovieItem-Card">
                <Card key={movie.id} >
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
                                <IconButton aria-label={`info about ${movie.title}`} >
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

export default MovieItem;
