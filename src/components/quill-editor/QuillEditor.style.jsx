import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  editor_container: {
    minHeight: "calc(100vh - 320px)",
    height: "calc(100vh - 190px)",

    // [theme.breakpoints.down("xs")]: {
    //   height: "calc(100vh - 110px)",
    // },
  },
  quill: {
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
    },
    width: "100%",
    // height: "18em",
    "& .ql-container": {
      overflow: "hidden",
    },
    "& .ql-editor": {
      paddingBottom: "8em",
      overflow: "auto",
      height: "calc(100vh - 165px)",
      [theme.breakpoints.down("md")]: {
        height: "calc(100vh - 185px)",
      },
      [theme.breakpoints.down("sm")]: {
        height: "calc(100vh - 200px)",
      },
      [theme.breakpoints.down("xs")]: {
        height: "calc(100vh - 225px)",
      },
    },
  },
}));

export default useStyles;
