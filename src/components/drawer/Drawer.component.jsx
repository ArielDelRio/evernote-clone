import React from "react";
import Drawer from "@material-ui/core/Drawer";
import styles from "./Drawer.style";

const TemporaryDrawer = ({ children, isDrawerOpen, handleDrawerToggle }) => {
  const classes = styles();

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
