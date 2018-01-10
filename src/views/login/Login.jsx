/**
 * @file Login.jsx
 * @author denglingbo
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { loginAction } from '../../actions/user';

class App extends Component {
    handleLogin = () => {
        loginAction({
            login: 'admin',
            password: '123456',
        }).then(() => {
            // success
        }).catch(err => {
            console.error(err);
        });
    }

    render() {
        return (
            <div>
                <input type="text" defaultValue="admin" />
                <input type="password" defaultValue="123456" />
                <button onClick={this.handleLogin}>Login!!</button>
            </div>
        )
    }
}

App.propTypes = {
    // location: PropTypes.objectOf(PropTypes.any)
}

export default withRouter(App);
