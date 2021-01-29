import React, { Component } from "react";
import styles from "./Sidebar.style";
import { withStyles, Button, List, Divider } from "@material-ui/core";
import SidebarItem from "../sidebaritem/SidebarItem.component";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingNote: false,
      title: null,
    };
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updateTitle = (title) => {
    this.setState({ title: title });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  };

  selectNote = (note, index) => {
    this.props.selectNote(note, index);
  };
  deleteNote = (note) => {
    this.props.deleteNote(note);
  };

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    return (
      <div className={classes.sidebarContainer}>
        <Button className={classes.newNoteBtn} onClick={this.newNoteBtnClick}>
          {this.state.addingNote ? "Cancel" : "New Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={(e) => this.updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SidebarItem
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
