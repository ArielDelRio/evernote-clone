import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  editor_container: {
    height: "calc(100vh - 120px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 110px)",
    },
  },
  quill: {
    width: "100%",
    "& .ql-container": {
      overflow: "hidden",
    },
  },
}));

export default useStyles;
