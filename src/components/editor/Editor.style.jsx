const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "100%",
    boxShadow: "0px 0px 2px black",
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
});

export default styles;
