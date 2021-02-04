import React, { Component } from "react";
import ReactQuill from "react-quill";
import MarkdownEditor from "../markdown-editor/MarkdownEditor.component";
import debounce, {
  getMarkdownText,
  htmlToMarkdown,
  removeHTMLTags,
} from "../../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import QuillEditor from "../quill-editor/QuillEditor.component";
import {
  TextField,
  withStyles,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";
import styles from "./Editor.style";
import EDITION_TYPES from "../../EditionTypes";

const MarkdownLogo = EDITION_TYPES.MARKDOWN.logo;
const QuillLogo = EDITION_TYPES.QUILL.logo;

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

  updateType = (val) => {
    //val === true if Switch is checked ergo Markdown type is selected
    if (val) {
      const parseText = htmlToMarkdown(this.state.text);
      this.setState({ type: EDITION_TYPES.MARKDOWN.id, text: parseText });
    } else {
      const parseText = getMarkdownText(this.state.text);
      this.setState({ type: EDITION_TYPES.QUILL.id, text: parseText });
    }
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
          <Grid container justify="space-between" alignItems="flex-end">
            <Grid style={{ display: "inline-flex" }}>
              <BorderColorIcon className={classes.editIcon} />
              <TextField
                inputProps={{
                  className: classes.input,
                }}
                placeholder="Note title..."
                value={this.state.title || ""}
                onChange={(e) => this.updateTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Switch
                      checked={this.state.type === EDITION_TYPES.MARKDOWN.id}
                      color="primary"
                      icon={<QuillLogo />}
                      checkedIcon={<MarkdownLogo />}
                      classes={{
                        track: classes.switch_track,
                        switchBase: classes.switch_base,
                        colorPrimary: classes.switch_primary,
                      }}
                      onChange={(e) => this.updateType(e.target.checked)}
                    />
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </div>
        {this.state.type === EDITION_TYPES.QUILL.id && (
          // <ReactQuill
          //   className={classes.quill}
          //   value={this.state.text}
          //   onChange={this.handleUpdateBody}
          // />
          <QuillEditor
            content={this.state.text}
            handleUpdateBody={this.handleUpdateBody}
          />
        )}
        {this.state.type === EDITION_TYPES.MARKDOWN.id && (
          <MarkdownEditor
            content={this.state.text}
            handleUpdateBody={this.handleUpdateBody}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
