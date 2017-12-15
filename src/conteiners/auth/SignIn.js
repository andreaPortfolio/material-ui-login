import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Card, { CardContent } from 'material-ui/Card';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import AccountCircle from 'material-ui-icons/AccountCircle';

import { compose } from 'redux';

const styles = theme => ({
  container: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  backgroundContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  formControl: {
    width: '100%'
  },
  input: {
   
  },
  button: {
    width: '100%',
    backgroundColor: '#AA00FF',
    top:'5em' ,
    '&:hover': {
        backgroundColor: '#673AB7',
      },
  },

  card: {
    width: '26em',
    height: '28em',
    alignSelf: 'center',
    margin: 'auto',
    top: '10em',
    position: 'relative',
    backgroundColor: '#fff'
  }
});

class SignIn extends React.Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    rememberMe: false
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleChangeRememberMe = event => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  handleFormSubmit = event => {
    const { email, password, rememberMe } = this.state;
   this.props.signInUser({ email, password, rememberMe });
  };

  render() {
    const { classes, handleSubmit, errorMessage, fields: { email, password, rememberMe } } = this.props;
console.log('SignIn', this.props)
    return (
      <div className={classes.container}>
      <div className={classes.backgroundContainer}></div>
        <div className={classes.card}>
          <CardContent>
            <div style={{display: 'flex', justifyContent:'center'}}><AccountCircle style={{ color: '#aa02ff', width:'80px',height:'80px'}}/></div>
            <div style={{ color: 'red', marginTop: '1em', display: 'flex', justifyContent: 'center', height: '2em'}}>{errorMessage && errorMessage.error}</div>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  className={classes.input}
                  value={this.state.username}
                  onChange={this.handleChangeEmail}
                />
                <FormHelperText error={true}>{this.state.emailError}</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  className={classes.input}
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
                
                <FormHelperText error={true}>{this.state.passwordError}</FormHelperText>
              </FormControl>
              <Button type="submit" className={classes.button} raised color="contrast">
                Login
             </Button>
            </form>
          </CardContent>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};


function mapStateToProps(state) {

    //console.log('auth', state.reducers.auth)
    return {errorMessage: state.reducers.auth};
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'signin',
        fields: ['email', 'password', 'rememberMe'],
    })
)(withStyles(styles)(SignIn))

