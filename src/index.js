import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
    yield takeEvery('FETCH_DETAILS', selectedMovieSaga);
    yield takeEvery('FETCH_DETAILS', selectedMovieGenresSaga);
    yield takeEvery('RESET_MOVIES_DETAILS', resetSelectedMovieSaga);
}

// Get all movies from server then store in movieReducer
function* getMoviesSaga(){
    try{
        const movies = yield axios.get('/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch (error) {
        console.log('Error in getMoviesSaga: ', error);
    }
}

// Get specific movie details from server then store in selectedMovieDetailsReducer
function* selectedMovieSaga(action) {
    try {
        const details = yield axios.get(`/movie/details/${action.payload}`);
        console.log('selectedMovieSaga details.data[0]: ', details.data[0]);
        yield put({ type: "SET_MOVIE_DETAILS", payload: details.data[0] });
    } catch (error) {
        console.log('Error in selectMovieSaga', error);
    }
}

// Get genres for selected movie then store in selectedGenresReducer
function* selectedMovieGenresSaga(action) {
    try {
        const genres = yield axios.get(`/genre/details/${action.payload}`);
        console.log('selectedMovieGenresSaga genres.data[0].genres_array: ', genres.data[0].genres_array);
        yield put({ type: "SET_GENRES", payload: genres.data[0].genres_array });
    } catch (error) {
        console.log('Error in selectedMovieGenresSaga', error);
    }
}

// Resets selectedGenresReducer & selectedMovieDetailsReducer
function* resetSelectedMovieSaga() {
    try {
        yield put({ type: "SET_MOVIE_DETAILS", payload: {} });
        yield put({ type: "SET_GENRES", payload: [] });
    } catch (error) {
        console.log('Error in resetSelectedMovieSaga', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Stores all movies returned from the server
const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Stores details from server of selected movie
const selectedMovieDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload
        default:
            return state;
    }
}

// Stores genres of selected movie 
// Will return an empty array if no genres are assigned
const selectedGenresReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            if(!action.payload){
                return [];
            }
            else{
                return action.payload;
            }
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        moviesReducer,
        selectedGenresReducer,
        selectedMovieDetailsReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
