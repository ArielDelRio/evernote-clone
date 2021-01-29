import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => {
  return {
    list: {
      width: 250,
      [theme.breakpoints.down("xs")]: {
        width: "100vw",
      },
    },
    drawerHeader: {
      display: "flex",
      padding: theme.spacing(0, 1),

      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
    },
  };
});

const TemporaryDrawer = ({ children, isDrawerOpen, handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <div>
      <React.Fragment>
        <Drawer open={isDrawerOpen} variant="persistent">
          <div className={classes.list} role="presentation">
            {children}
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
