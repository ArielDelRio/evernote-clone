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
    position: "relative",
    top: "-8px",
    right: "-15px",
  },
  root: {
    minWidth: "0 !important",
  },
  alignItemsFlexStart: {
    marginTop: "0 !important",
  },
  noNotesInfo: {
    display: "flex",
    justifyContent: "center",
    minHeight: "85vh",
    opacity: ".8",
    alignItems: "center",
    fontSize: "larger",
  },
}));

export default useStyles;
