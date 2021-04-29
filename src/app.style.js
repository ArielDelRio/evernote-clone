import { makeStyles } from "@material-ui/core";

const drawerWidth = 250;

const styles = makeStyles((theme) => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  newNoteBtn: {
    height: "4rem",
    color: theme.palette.success.main,
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },

  dashboard: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: "30vh",
  },
  logo: {
    maxHeight: "50vw",
  },
}));

export default styles;
