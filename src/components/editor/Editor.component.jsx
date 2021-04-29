import React, { Component } from "react";
import MarkdownEditor from "../markdown-editor/MarkdownEditor.component";
import debounce, { getMarkdownText, htmlToMarkdown } from "../../helper";
import QuillEditor from "../quill-editor/QuillEditor.component";
import { withStyles } from "@material-ui/core";
import styles from "./Editor.style";
import EDITION_TYPES from "../../EditionTypes";
import EditorHeader from "./editor-header/EditorHeader.component";

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      type: "",
      id: "",
      showPreviewOnSmallScreen: false,
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

  handleShowPreviewOnSmallScreen = () => {
    this.setState({
      showPreviewOnSmallScreen: !this.state.showPreviewOnSmallScreen,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <EditorHeader
          title={this.state.title}
          type={this.state.type}
          updateTitle={this.updateTitle}
          updateType={this.updateType}
          handleShowPreviewOnSmallScreen={this.handleShowPreviewOnSmallScreen}
          showPreviewOnSmallScreen={this.state.showPreviewOnSmallScreen}
        />
        {this.state.type === EDITION_TYPES.QUILL.id && (
          <QuillEditor
            content={this.state.text}
            handleUpdateBody={this.handleUpdateBody}
          />
        )}
        {this.state.type === EDITION_TYPES.MARKDOWN.id && (
          <MarkdownEditor
            content={this.state.text}
            showPreviewOnSmallScreen={this.state.showPreviewOnSmallScreen}
            handleUpdateBody={this.handleUpdateBody}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
