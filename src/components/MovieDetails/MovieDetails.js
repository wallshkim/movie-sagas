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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class Details extends Component {

    // Reset selectedGenresReducer & selectedMovieDetailsReducer
    // Route to '/'
    backToList = () => {
        this.props.dispatch({
            type: 'RESET_MOVIES_DETAILS'
        })
        this.props.history.push(`/`);
    }

    // Dispatch action to get details from server
    editDetails = (id) => {
        this.props.dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        return (
            <div className="Details">
                <AppBar className="Details-AppBar" position="static">
                    <Toolbar>
                        <Button onClick={this.backToList} color="inherit">Back to List</Button>
                        <Button onClick={() => this.editDetails(this.props.selectedMovieDetailsReducer.id)} color="inherit">Edit</Button>
                    </Toolbar>
                </AppBar>
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
                <div className="Details-DescriptionContainer">
                    <Paper className="Details-Description">
                        <Typography variant="h5" component="h3">{this.props.selectedMovieDetailsReducer.description}</Typography>
                    </Paper>
                </div>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(Details));