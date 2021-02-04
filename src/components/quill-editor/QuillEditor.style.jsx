import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  quill: {
    width: "100%",
    height: "calc(100vh - 180px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 210px)",
    },
  },
}));

export default useStyles;
