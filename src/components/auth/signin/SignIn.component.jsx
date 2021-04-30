import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { CircularProgress, Paper } from "@material-ui/core";

import useStyles from "./SignIn.style";

export default function SignIn({ signIn, loading, setshowSignUp, validation }) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target["email"].value;
    const password = event.target["password"].value;

    signIn(email, password);
    event.target.reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} className={classes.containerForm}>
        <CssBaseline />
        <div className={classes.paper}>
          <img
            className={classes.avatar}
            src={"../../../logo.png"}
            alt="Notes App Logo"
          />
          <Typography component="h1" variant="h6">
            Get Your Notes Everywhere
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={validation.email.error}
              helperText={validation.email.helperText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={validation.password.error}
              helperText={validation.password.helperText}
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
              disabled={loading}
              className={classes.submit}
            >
              {loading && (
                <CircularProgress
                  color="secondary"
                  size={24}
                  className={classes.progressBtn}
                />
              )}
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={setshowSignUp}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
