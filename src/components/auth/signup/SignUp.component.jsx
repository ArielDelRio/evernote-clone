import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { CircularProgress, Paper } from "@material-ui/core";

import useStyles from "./SignUp.style";

export default function SignUp({ signUp, loading, setshowSignUp, validation }) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target["email"].value;
    const password = event.target["password"].value;
    signUp(email, password);
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
          <form
            method="post"
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={validation.email.error}
                  helperText={validation.email.helperText}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={validation.password.error}
                  helperText={validation.password.helperText}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  color="secondary"
                  size={24}
                  className={classes.progressBtn}
                />
              )}
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={setshowSignUp}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
