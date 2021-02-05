import { Box } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar.component";
import useStyles from "./QuillEditor.style";

export const QuillEditor = ({ content, handleUpdateBody }) => {
  const classes = useStyles();
  return (
    <div>
      <Box
        className={classes.editor_container}
        display="flex"
        flexDirection="column"
      >
        <EditorToolbar />
        <Box flex={1} overflow="auto">
          <ReactQuill
            className={classes.quill}
            value={content}
            onChange={handleUpdateBody}
            placeholder={"Write something awesome..."}
            modules={modules}
            formats={formats}
          />
        </Box>
      </Box>
    </div>
  );
};

export default QuillEditor;
