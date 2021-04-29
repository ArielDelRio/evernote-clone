import React from "react";
import { Box, Paper } from "@material-ui/core";

import useStyles from "./SplashLoading.style";

const SplashLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.splashContent}>
      <Paper variant="elevation" elevation={4}>
        <img
          className={classes.logo}
          src="../../logo.png"
          alt="Evernote dashboard Logo"
        />
      </Paper>
    </div>
  );
};

export default SplashLoading;
