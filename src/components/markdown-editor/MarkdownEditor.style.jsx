import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
  editorInputTextArea: {
    // overflowY: "scroll",
    minHeight: "calc(100vh - 145px)",
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 135px)",
    },
  },
}));

export default useStyles;
