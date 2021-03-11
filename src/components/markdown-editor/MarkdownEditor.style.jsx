import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      position: "fixed",
    },
  },
  formControl: {
    margin: theme.spacing(1),
  },
  editorInputTextArea: {
    paddingBottom: "8em",
    display: "block",
    color: theme.palette.getContrastText("#fff"),
    minHeight: "calc(100vh - 145px)",
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 265px)",
    },
  },
  previewInputTextArea: {
    paddingBottom: "8em",
    marginTop: 20,
    display: "block",
    overflowWrap: "break-word",
    overflowY: "auto",
    overflowX: "hidden",
    color: theme.palette.getContrastText("#fff"),
    height: "calc(100vh - 140px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 120px)",
    },
  },
}));

export default useStyles;
