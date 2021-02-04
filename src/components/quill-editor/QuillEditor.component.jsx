import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar.component";
import useStyles from "./QuillEditor.style";

export const QuillEditor = ({ content, handleUpdateBody }) => {
  const classes = useStyles();
  return (
    <div>
      <EditorToolbar />
      <ReactQuill
        className={classes.quill}
        // theme="snow"
        value={content}
        onChange={handleUpdateBody}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillEditor;
