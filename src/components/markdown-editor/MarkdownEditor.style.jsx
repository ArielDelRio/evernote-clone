import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  editorInputTextArea: {
    display: "block",
    color: theme.palette.getContrastText("#fff"),
    minHeight: "calc(100vh - 145px)",
    [theme.breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 135px)",
    },
  },
  previewInputTextArea: {
    marginTop: 20,
    display: "block",
    overflowWrap: "break-word",
    overflowY: "auto",
    color: theme.palette.getContrastText("#fff"),
    height: "calc(100vh - 130px)",
    [theme.breakpoints.down("xs")]: {
      height: "calc(100vh - 120px)",
    },
  },
}));

export default useStyles;
