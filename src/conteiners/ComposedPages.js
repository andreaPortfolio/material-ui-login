import React, { Component } from 'react';
//import App  from './App';
import App  from '../components/AppBar/AppBar.js';
import HomeComponent  from '../components/Home';
import UsersComponent  from '../components/Users';
import { Switch, Route } from 'react-router-dom'

const styles = {
 
  rootContainer: {
    padding: '25px 33px 0',
    marginTop: '4em'
  }
};

export const Home = () => (
  <div>
    <App />
    <div style={styles.rootContainer}>
    <HomeComponent/> 
    </div>
    
  </div>
)

export const Users = () => (
  <div>
    <App />
    <div style={styles.rootContainer}>
    <UsersComponent/> 
    </div> 
  </div>
)
