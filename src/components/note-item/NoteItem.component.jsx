import React, { Component } from "react";
import { removeHTMLTags } from "../../helper";
import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./NoteItem.style";

const NoteItem = ({
  selectNote,
  deleteNote,
  _index,
  _note,
  selectedNoteIndex,
}) => {
  const classes = useStyles();

  const handleDeleteNote = (_note, event) => {
    console.log("delete");
    event.stopPropagation();
    if (window.confirm(`Are you sure you want to delete: ${_note.title}`)) {
      deleteNote(_note);
    }
  };

  return (
    <div key={_index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
        onClick={() => selectNote(_note, _index)}
      >
        <div className={classes.textSection}>
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          />
          <DeleteIcon
            onClick={(event) => handleDeleteNote(_note, event)}
            className={classes.deleteIcon}
          />
        </div>
      </ListItem>
    </div>
  );
};

export default NoteItem;
