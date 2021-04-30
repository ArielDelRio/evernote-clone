import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  containerForm: {
    position: "relative",
    top: "10vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    paddingTop: 0,
  },
  avatar: {
    marginBottom: "-2em",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progressBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default useStyles;
