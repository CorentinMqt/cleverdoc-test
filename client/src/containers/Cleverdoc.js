import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import './Home.css';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Cleverdoc extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <main className={this.props.classes.content}>
          <div className={this.props.classes.toolbar}/>
          <div>
            <h1>Add task</h1>
          </div>
        </main>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
)(Cleverdoc)