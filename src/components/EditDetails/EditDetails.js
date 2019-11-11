import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';

class Edit extends Component {

    state = {
        editedMovie: {
            title: '',
            description: ''
        }
    }

    handleChange = (event, property) => {
        console.log('event happened')
        this.setState({
            editedMovie: {
                ...this.state.editedMovie,
                [property]: event.target.value,
            }
        });
    }

    // componentDidMount() {
    //     // Gets movies and holds them in moviesReducer
    //     this.props.dispatch({ 
    //         type: 'FETCH_DETAILS', 
    //         payload: this.props.selectedMovieDetailsReducer.id  
    //     });
    // }

    // Dispatch action to selectedMovieSaga & selectedMovieGenresSaga to get specific movie details
    // Route to '/details/id'
    cancelEdit = (id) => {
        console.log('cancel clicked with id: ', id);
        this.props.dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
        this.props.history.push(`/details/${id}`);
    }

    saveEdit = () => {
        this.props.dispatch({ type: 'UPDATE_MOVIE', payload: this.state.editedMovie })
        this.setState({
            editedMovie: {
                title: '',
                description: ''
            }
        });
    }

    // addNewPlant = event => {
    //     // event.preventDefault();
    //     this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant })
    //     this.setState({
    //         editedMovie: {
    //             title: '',
    //             description: ''
    //         }
    //     });
    // }

    render() {
        return (
            <div className="Edit">

                <AppBar className="Edit-AppBar" position="static">
                    <Toolbar>
                        <Button onClick={() => this.cancelEdit(this.props.selectedMovieDetailsReducer.id)} color="inherit">Cancel</Button>
                        <Button onClick={() => this.saveEdit(this.props.selectedMovieDetailsReducer.id)} color="inherit">Save</Button>
                    </Toolbar>
                </AppBar>
                <div className="Edit-ImgGenreContainer">
                    <img src={this.props.selectedMovieDetailsReducer.poster} alt={this.props.selectedMovieDetailsReducer.title} />
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
                <div className="Edit-FormContainer">
                    <div>
                    <TextField
                        id="standard-helperText"
                        label="Title"
                        // value={this.props.selectedMovieDetailsReducer.title}
                        defaultValue={this.props.selectedMovieDetailsReducer.title}
                        type="title"
                        margin="normal"
                        variant="outlined"
                        onChange={(event) => this.handleChange(event, 'title')}
                    />
                    </div>

                    <div>
                    <TextField
                        className="Edit-Description"
                        id="standard-helperText"
                        label="Description"
                        // value={this.props.selectedMovieDetailsReducer.description}
                        defaultValue={this.props.selectedMovieDetailsReducer.description}
                        type="description"
                        margin="normal"
                        variant="outlined"
                        multiline="true"
                        onChange={(event) => this.handleChange(event, 'description')}
                    />
                    </div>
                </div>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>

                <pre>{JSON.stringify(this.props.selectedMovieDetailsReducer, null, 2)}</pre>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(Edit));
