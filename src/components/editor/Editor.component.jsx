import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { TextField, withStyles, Grid } from "@material-ui/core";
import styles from "./Editor.style";

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      id: "",
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    });
  }
  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      });
    }
  }

  handleUpdateBody = (val) => {
    this.setState({ text: val });
    this.update();
  };

  updateTitle = (val) => {
    this.setState({ title: val });
    this.update();
  };

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });
  }, 1500);

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <div className={classes.titleInput}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <BorderColorIcon className={classes.editIcon} />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                classes={{ root: classes.input }}
                placeholder="Note title..."
                value={this.state.title || ""}
                onChange={(e) => this.updateTitle(e.target.value)}
              />
            </Grid>
          </Grid>
        </div>
        <ReactQuill
          className={classes.quill}
          value={this.state.text}
          onChange={this.handleUpdateBody}
        ></ReactQuill>
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
