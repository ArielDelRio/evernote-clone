const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "100%",
    boxShadow: "0px 0px 2px black",
  },
  titleInput: {
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    width: "100%",
    backgroundColor: "#29487d",
    color: "white",
    paddingLeft: "10px",
  },
  input: {
    color: "white",
    fontSize: "larger",
    width: "40vw",
  },
  editIcon: {
    color: "white",
    padding: "10px",
  },
  editorContainer: {
    // height: "100vh",
    width: "100%",
    boxSizing: "border-box",
  },
  quill: {
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },

  //switch
  switch_track: {
    backgroundColor: "#f50057",
  },
  switch_base: {
    color: "#f50057",
    "&.Mui-disabled": {
      color: "#e886a9",
    },
    "&.Mui-checked": {
      color: "#95cc97",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#4CAF50",
    },
  },
  switch_primary: {
    "&.Mui-checked": {
      color: "#4CAF50",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#4CAF50",
    },
  },
});

export default styles;
