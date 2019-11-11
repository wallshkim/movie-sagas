import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Edit extends Component {

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

    saveEdit = (id) => {

    }

    render() {
        return (
            <div className="Edit">

                <AppBar className="Details-AppBar" position="static">
                    <Toolbar>
                        <Button onClick={() => this.cancelEdit(this.props.selectedMovieDetailsReducer.id)} color="inherit">Cancel</Button>
                        <Button onClick={() => this.saveEdit(this.props.selectedMovieDetailsReducer.id)} color="inherit">Save</Button>
                    </Toolbar>
                </AppBar>
                <form>
                    <TextField
                        id="standard-helperText"
                        label="Title"
                        defaultValue={this.props.selectedMovieDetailsReducer.title}
                        type="title"
                        margin="normal"
                        variant="outlined"
                    />
                </form>
                <pre>{JSON.stringify(this.props.selectedMovieDetailsReducer, null, 2)}</pre>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(Edit));
