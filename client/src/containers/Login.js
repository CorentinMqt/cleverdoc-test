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

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    fill: false,
    incorrect: false
  };
  send = async () => {
    const { email, password } = this.state;
    if (!email || email.length === 0 || !password || password.length === 0) {
      if (this.state.incorrect) {
        this.setState({ fill: true, incorrect: false });
      } else {
        this.setState({ fill: true});
      }
    }
    try {
      const { data } = await API.login(email, password);
      localStorage.setItem("token", data.token);
      window.location = "/home";
    }
    catch (error) {
      console.error(error);
      if (error.request.status === 401) {
        if (this.state.fill) {
          this.setState({ incorrect: true, fill: false });
        } else {
          this.setState({ incorrect: true});
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
    const { email, password } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </form>
          { this.state.fill ?
            <p className="error">You must enter your email and password in order to connect.</p>
            :
            ''
          }
          { this.state.incorrect ?
            <p className="error">Enter valid email and password.</p>
            :
            ''
          }
          <Button onClick={this.send} type="submit" fullWidth variant="contained" color="primary" className="submit">
            Sign In
          </Button>
        </div>
      </Container>
    );
  }
}