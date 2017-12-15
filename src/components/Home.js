import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import PersonIcon from 'material-ui-icons/Person';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },

  card: {
    display: 'flex'
  },
  icon: {
    width: '5em',
    height: '5em',
    color: '#9c27b0'
  },
  typography: {
    textAlign: 'center'
  },
  singleIconContainer: {
    display: 'block',
    width: '9em',
    textAlign: 'center',
    padding: '1em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1efef'
    }
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  handlerClick = () => {
    console.log('test');
  };
  render() {
    const { classes } = this.props;
    return (

        <div
          className={classes.singleIconContainer}
          onClick={this.handlerClick}
        >
          <PersonIcon className={classes.icon} />

          <Typography
            style={{ fontSize: '1rem' }}
            className={classes.typography}
            type="title"
          >
            Users
          </Typography>
          <Typography
            style={{ fontSize: '0.8rem', opacity: '.87' }}
            className={classes.typography}
            type="subheading"
          >
            Add, rename and manage users
          </Typography>
        </div>
    
    );
  }
}

export default withStyles(styles)(Home);
