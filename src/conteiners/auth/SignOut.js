import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import * as actions from '../../actions';
import { connect } from 'react-redux';


import { compose } from 'redux';

const styles = theme => ({
  container: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});

class SignOut extends React.Component {
  state = {
    
  };

  componentWillMount() {
    this.props.signoutUser();

    this.props.history.push("/");
}

  render() {
    const { classes  } = this.props;

    return (
      <div className={classes.container}>
            Sei Uscito!!!
      </div>
    );
  }
}

SignOut.propTypes = {
  classes: PropTypes.object.isRequired
};



export default connect(null, actions)(SignOut)