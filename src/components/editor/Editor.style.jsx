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
    paddingLeft: "20px",
  },
  input: {
    color: "white",
    fontSize: "larger",
  },
  editIcon: {
    color: "white",
  },
  editorContainer: {
    height: "100vh",
    width: "100%",
    boxSizing: "border-box",
  },
  quill: {
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1),
  },
});

export default styles;
