import React from "react";
import useStyles from "./MarkdownEditor.style";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
} from "@material-ui/core";
import { getMarkdownText } from "../../helper";

//Editor Component
const Editor = ({ handleUpdateBody, content, classes }) => (
  <Paper>
    <FormControl label="Markdown Editor" fullWidth variant="filled">
      <InputLabel htmlFor="editor">Markdown Editor</InputLabel>
      <FilledInput
        id="editor"
        classes={{ input: classes.editorInputTextArea }}
        multiline
        rows={1}
        value={content}
        onChange={(e) => handleUpdateBody(e.target.value)}
      />
    </FormControl>
  </Paper>
);

//Preview Component
const Preview = ({ content, classes }) => (
  <Paper>
    <FormControl label="Preview" fullWidth variant="filled">
      <InputLabel htmlFor="preview" shrink={content.length > 0}>
        Preview
      </InputLabel>
      <FormHelperText id="preview">
        <span
          className={classes.previewInputTextArea}
          dangerouslySetInnerHTML={{
            __html: getMarkdownText(content),
          }}
        ></span>
      </FormHelperText>
    </FormControl>
  </Paper>
);

const MarkdownEditor = ({ content, handleUpdateBody }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Editor
              content={content}
              classes={classes}
              handleUpdateBody={handleUpdateBody}
            />
          </Grid>
          <Grid item sm={6}>
            <Preview content={content} classes={classes} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MarkdownEditor;
