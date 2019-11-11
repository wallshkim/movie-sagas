import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Details extends Component {

    render() {
        return (
            <div className="Details">
                <h1>Details</h1>
                
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapReduxStateToProps)(Details));