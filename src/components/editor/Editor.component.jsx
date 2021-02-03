import React, { Component } from "react";
import ReactQuill from "react-quill";
import MarkdownEditor from "../markdown-editor/MarkdownEditor.component";
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
      type: "",
      id: "",
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.selectedNote.id,
      title: this.props.selectedNote.title,
      type: this.props.selectedNote.type,
      text: this.props.selectedNote.body,
    });
  }
  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        id: this.props.selectedNote.id,
        title: this.props.selectedNote.title,
        type: this.props.selectedNote.type,
        text: this.props.selectedNote.body,
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
      type: this.state.type,
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
        {/* <ReactQuill
          className={classes.quill}
          value={this.state.text}
          onChange={this.handleUpdateBody}
        /> */}
        <MarkdownEditor
          content={this.state.text}
          handleUpdateBody={this.handleUpdateBody}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
