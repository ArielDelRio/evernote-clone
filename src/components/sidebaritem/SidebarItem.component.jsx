import React, { Component } from "react";
import { removeHTMLTags } from "../../helper";
import styles from "./SidebarItem.style";
import { ListItem, ListItemText, withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class SidebarItem extends Component {
  selectNote = (_note, _index) => {
    this.props.selectNote(_note, _index);
  };

  deleteNote = (_note, event) => {
    console.log("delete");
    event.stopPropagation();
    if (window.confirm(`Are you sure you want to delete: ${_note.title}`)) {
      this.props.deleteNote(_note);
    }
  };

  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;

    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
          onClick={() => this.selectNote(_note, _index)}
        >
          <div className={classes.textSection}>
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
            />
            <DeleteIcon
              onClick={(event) => this.deleteNote(_note, event)}
              className={classes.deleteIcon}
            />
          </div>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(SidebarItem);
