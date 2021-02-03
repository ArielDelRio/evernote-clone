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

//theme options

// const themes = {
//   light: {
//     set1: {
//       primary: "#f7f2f2e5",
//       secondary: "#221F1F",
//     },
//     set2: {
//       primary: "#c9e4f8",
//       secondary: "#000",
//     },
//   },
//   dark: {
//     set1: {
//       primary: "#0f0f0ff3",
//       secondary: "#f7f2f2e5",
//     },
//     set2: {
//       primary: "#292a2bce",
//       secondary: "#c9e4f8",
//     },
//   },
// };

//Editor Component
const Editor = ({ handleUpdateBody, content, classes }) => (
  <Paper>
    <FormControl label="Markdown Editor" fullWidth variant="filled">
      <InputLabel htmlFor="editor">Markdown Editor</InputLabel>
      <FilledInput
        id="editor"
        multiline
        rows={1}
        value={content}
        onChange={(e) => handleUpdateBody(e.target.value)}
        classes={{ input: classes.editorInputTextArea }}
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

// const placeholder = `
// # Welcome to my React Markdown Previewer!

// ## This is a sub-heading...
// ### And here's some other cool stuff:

// Heres some code, \`<div></div>\`, between 2 backticks.

// \`\`\`
// // this is multi-line code:

// function anotherExample(firstLine, lastLine) {
//   if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
//     return multiLineCode;
//   }
// }
// \`\`\`

// You can also make text **bold**... whoa!
// Or _italic_.
// Or... wait for it... **_both!_**
// And feel free to go crazy ~~crossing stuff out~~.

// There's also [links](https://www.freecodecamp.com), and
// > Block Quotes!

// And if you want to get really crazy, even tables:

// Wild Header | Crazy Header | Another Header?
// ------------ | ------------- | -------------
// Your content can | be here, and it | can be here....
// And here. | Okay. | I think we get it.

// - And of course there are lists.
//   - Some are bulleted.
//      - With different indentation levels.
//         - That look like this.

// 1. And there are numbererd lists too.
// 1. Use just 1s if you want!
// 1. But the list goes on...
// - Even if you use dashes or asterisks.
// * And last but not least, let's not forget embedded images:

// ![React Logo w/ Text](https://goo.gl/Umyytc)
// `;
