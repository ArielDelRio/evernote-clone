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
  typeIcon: {
    marginTop: 0,
    position: "relative",
    minWidth: 0,
    top: "-8px",
    right: "-15px",
  },
}));

export default useStyles;
