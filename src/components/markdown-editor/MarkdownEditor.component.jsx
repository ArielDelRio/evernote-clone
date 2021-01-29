//marked options
marked.setOptions({ breaks: true });

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

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
                  <Preview
                    theme={this.state.configTheme.theme}
                    previewContent={this.state.previewContent}
                  />
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

//Editor Component
const Editor = (props) => {
  return (
    <textarea
      rows="40"
      className="form-control h-100 w-100"
      style={{
        backgroundColor: props.theme.set1.primary,
        color: props.theme.set1.secondary,
      }}
      id="editor"
      onChange={(e) => props.change(e.target.value)}
    >
      {props.editorContent}
    </textarea>
  );
};

//Preview Component
const Preview = (props) => {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.previewContent, { renderer: renderer }),
      }}
    ></div>
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
