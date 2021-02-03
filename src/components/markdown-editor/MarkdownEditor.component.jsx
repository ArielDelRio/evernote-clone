import React from "react";
import useStyles from "./MarkdownEditor.style";
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
} from "@material-ui/core";
import { getMarkdownText } from "../../helper";

//theme options

const themes = {
  light: {
    set1: {
      primary: "#f7f2f2e5",
      secondary: "#221F1F",
    },
    set2: {
      primary: "#c9e4f8",
      secondary: "#000",
    },
  },
  dark: {
    set1: {
      primary: "#0f0f0ff3",
      secondary: "#f7f2f2e5",
    },
    set2: {
      primary: "#292a2bce",
      secondary: "#c9e4f8",
    },
  },
};

//Editor Component
const Editor = ({ handleUpdateBody, content, classes }) => (
  <Paper>
    <TextField
      classes={{ root: classes.editorTextArea }}
      label="Markdown Editor"
      multiline
      fullWidth
      value={content}
      variant="filled"
      rows={1}
      onChange={(e) => handleUpdateBody(e.target.value)}
      InputProps={{
        classes: { input: classes.editorInputTextArea },
      }}
    />
  </Paper>
);

//Preview Component
const Preview = ({ content, classes }) => (
  <Paper>
    <FormControl
      classes={{ root: classes.editorTextArea }}
      label="Preview"
      fullWidth
      variant="filled"
    >
      <InputLabel htmlFor="my-input" shrink>
        Preview
      </InputLabel>
      <Input
        readOnly
        disableUnderline
        id="my-input"
        multiline
        rows={1}
        style={{ margin: 0, padding: 0 }}
      />
      <FormHelperText id="my-helper-text">
        <div
          className={classes.editorInputTextArea}
          dangerouslySetInnerHTML={{
            __html: getMarkdownText(content),
          }}
        ></div>
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

//App Component
class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultTheme = { type: "DARK", theme: themes.dark };

    this.state = {
      editorContent: placeholder,
      previewContent: "",
      configTheme: defaultTheme,
      changeMode: false,
      editorMode: false,
    };

    this.change = this.change.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.displayPanel = this.displayPanel.bind(this);
  }

  componentDidMount() {
    this.change(placeholder);
  }

  change(content) {
    this.setState({ editorContent: content, previewContent: content });
  }

  changeTheme() {
    let newTheme =
      this.state.configTheme.type === "DARK"
        ? { type: "LIGHT", theme: themes.light }
        : { type: "DARK", theme: themes.dark };

    this.setState({ configTheme: newTheme });
  }

  displayPanel() {
    let enableEditorMode = !this.state.editorMode;
    this.setState({ changeMode: true, editorMode: enableEditorMode });
  }

  render() {
    let editorClasses = "card d-none d-sm-block";
    let previewClasses = "card";
    if (this.state.changeMode) {
      editorClasses = this.state.editorMode ? "card" : "card d-none";
      previewClasses = this.state.editorMode ? "card d-none" : "card";
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Navbar
              theme={this.state.configTheme.theme}
              changeTheme={this.changeTheme}
              displayPanel={this.displayPanel}
            />
            <div className="card-group mt-1">
              <div className={editorClasses}>
                <Editor
                  theme={this.state.configTheme.theme}
                  change={this.change}
                  editorContent={this.state.editorContent}
                />
              </div>
              <div
                className={previewClasses}
                style={{
                  backgroundColor: this.state.configTheme.theme.set2.primary,
                  color: this.state.configTheme.theme.set2.secondary,
                  visible: !this.state.editorMode,
                }}
              >
                <div className="card-body">
                  {/* <Preview
                    theme={this.state.configTheme.theme}
                    previewContent={this.state.previewContent}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Navbar component
const Navbar = (props) => {
  return (
    <nav
      className="navbar shadow rounded-lg border-bottom border-info"
      style={{
        backgroundColor: props.theme.set1.primary,
        color: props.theme.set1.secondary,
      }}
    >
      <h2 className="h2 font-italic">
        Simple Markdown Preview
        <span className="text-muted" style={{ fontSize: "medium" }}>
          {" "}
          by ArieldRio
        </span>
      </h2>

      <ul className="navbar-nav">
        <div className="form-group form-inline">
          <div className="custom-control custom-switch d-sm-none ">
            <input
              type="checkbox"
              className="custom-control-input"
              id="switch2"
              onClick={props.displayPanel}
            />
            <label className="custom-control-label" htmlFor="switch2">
              Editor Mode
            </label>
          </div>
          <div className="custom-control custom-switch ml-4">
            <input
              type="checkbox"
              className="custom-control-input"
              id="switch1"
              onClick={props.changeTheme}
            />
            <label className="custom-control-label" htmlFor="switch1">
              Theme
            </label>
          </div>
        </div>
      </ul>
    </nav>
  );
};

const placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
