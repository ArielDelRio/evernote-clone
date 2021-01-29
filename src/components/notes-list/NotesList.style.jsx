import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "pointer",
  },
  textSection: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  deleteIcon: {
    "&:hover": {
      color: "red",
    },
    alignSelf: "center",
  },
}));

export default useStyles;
