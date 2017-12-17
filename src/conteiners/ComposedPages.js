import React from 'react';
//import App  from './App';
import App from './Layout/AppBar.js';
import HomeComponent from '../components/Home';
import UsersComponent from './Users/Users';


const styles = {

    rootContainer: {
        padding: '25px 33px 0',
        marginTop: '4em'
    }
};

export const Home = () => (
    <div>
        <App/>
        <div style={styles.rootContainer}>
            <HomeComponent/>
        </div>

    </div>
)

export const Users = () => (
    <div>
        <App/>
        <div style={styles.rootContainer}>
            <UsersComponent/>
        </div>
    </div>
)
