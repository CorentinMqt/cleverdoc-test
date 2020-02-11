import React from "react";
import API from "../utils/API";
import './Login.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    cpassword: "",
    fill: false,
    user_exist: false
  };
  send = async () => {
    const { email, password, cpassword } = this.state;
    if (!email || email.length === 0 || !password || password.length === 0 ||
      password !== cpassword) {
      if (this.state.user_exist) {
        this.setState({ fill: true, user_exist: false });
      } else {
        this.setState({ fill: true});
      }
    }
    try {
      const { data } = await API.signup({ email, password });
      console.log(data);
      localStorage.setItem("token", data.token);
      window.location = "/home";
    }
    catch (error) {
      console.error(error);
      if (error.request.responseText === "{\"text\":\"The user already exists\"}") {
        if (this.state.fill) {
          this.setState({ user_exist: true, fill: false });
        } else {
          this.setState({ user_exist: true });
        }
      }
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { email, password, cpassword } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={this.handleChange}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="cpassword"
              label="Confirm password"
              value={cpassword}
              onChange={this.handleChange}
              type="password"
              id="cpassword"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </form>
          { this.state.fill ?
            <p className="error">You must provide an email address and a password to register.</p>
            :
            ''
          }
          { this.state.user_exist ?
            <p className="error">This email address is already in use.</p>
            :
            ''
          }
          <Button onClick={this.send} type="submit" fullWidth variant="contained" color="primary" className="submit">
            Sign Up
          </Button>
        </div>
      </Container>
    );
  }
}