import React, { useRef } from "react";
import { useState } from 'react';
import { Spin } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import firebaseinit from '../credentials';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="www.beckfriends.com/">
        BECKFriends.com
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignInSide() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const inputRef = useRef(null);

  function handleClick(event) {

    setLoading(true);
    event.preventDefault();
    console.log();
    const email = event.target[0].value;
    const pwd = event.target[2].value;
    firebaseinit
  .auth()
  .signInWithEmailAndPassword(email, pwd)
  .then(res => {
    history.push("/admin/dashboard");
  })
  .catch(e => {
    console.log(e);
  });
    //history.push("/admin/dashboard");
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={12} className={classes.image} >
        <ReactPlayer url="https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/beckbaghq.mp4?alt=media&token=29f5b495-9252-4a7d-9cd5-0e3698ae8b58" playing loop muted width="100%" height="100%"/>
      </Grid>
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={0} square style={{ position: 'absolute', top: '32px', right: '0px', background: 'transparent' }}>
        <div className={classes.paper} style={{ background: 'white', padding: '30px', borderRadius: '12px', margin: '32px 8px' }}>
          <img src="https://firebasestorage.googleapis.com/v0/b/beckfriends-2-a4131.appspot.com/o/rsz_logo.png?alt=media&token=c29ec5dc-13c7-4a3a-aefc-0130203e64ea" alt="Girl in a jacket" className={classes.avatar} style={{ width: '65%' }} />
          {loading && <Spin tip="Loading..." />}
          {!loading && <form className={classes.form} noValidate onSubmit={handleClick}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              ref={inputRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>}
        </div>
      </Grid>
    </Grid>
  );
}