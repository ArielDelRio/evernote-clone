const { makeStyles } = require("@material-ui/core");

const styles = makeStyles((theme) => {
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

export default styles;
