import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MovieIcon from '@material-ui/icons/Movie';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class Details extends Component {
    render() {
        return (
            <div className="Details">
                
                <h1 className="Details-MovieTitle">{this.props.selectedMovieDetailsReducer.title}</h1>
                <div className="Details-ImgGenreContainer">
                    <img src={this.props.selectedMovieDetailsReducer.poster} alt={this.props.selectedMovieDetailsReducer.title} />
                    {/* <ul>
                            {this.props.selectedGenresReducer.map(genre => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul> */}
                    <List>
                        {this.props.selectedGenresReducer.map(genre => (
                            // <li key={this.props.selectedMovieDetailsReducer.id}>{genre}</li>
                            <ListItem key={genre}>
                                <ListItemIcon style={{ color: "black" }}>
                                    <MovieIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={genre}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>

                <Paper className="Details-Description">
                    <Typography variant="h5" component="h3">{this.props.selectedMovieDetailsReducer.description}</Typography>
                </Paper>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(Details));