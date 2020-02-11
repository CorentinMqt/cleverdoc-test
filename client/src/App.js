import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";
import API from "./utils/API";
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      widgets: [],
    }
  }

  state = {
    isAuth: false
  };

  checkAuth = () => {
    if (API.isAuth() === true)
      this.setState({ isAuth: true });
  };

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  componentDidMount() {
    this.checkAuth()
  }

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className={this.props.classes.root}>
        <AppBar
          position="fixed"
          className={clsx(this.props.classes.appBar, {
            [this.props.classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            {
              this.state.isAuth ?
                <div>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    edge="start"
                    className={clsx(this.props.classes.menuButton, {
                      [this.props.classes.hide]: open,
                    })}
                  >
                    <MenuIcon/>
                  </IconButton>
                  <Typography variant="h6" noWrap/>
                </div>
                :
                ""
            }
            <Navbar.Brand>
              {
                this.state.isAuth ?
                  <Link to="/home">Cleverdoc - Test</Link>
                  :
                  <Link to="/">Cleverdoc</Link>
              }
            </Navbar.Brand>
            {
              this.state.isAuth ?
                <Nav className="logout-container">
                  <LinkContainer to="">
                    <NavItem onClick={this.disconnect}>Logout</NavItem>
                  </LinkContainer>
                </Nav>
                :
                <Nav className="login-container">
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Nav>
            }
          </Toolbar>
        </AppBar>
        {
          this.state.isAuth ?
            ""
            :
            ""
        }
        <Routes/>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
)(App)