import React, { Component } from "react";
import { removeHTMLTags, getMarkdownText } from "../../helper";
import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./NoteItem.style";
import EDITION_TYPES from "../../EditionTypes";

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

  const textPreview = () => {
    console.log(_note.body);
    const text = "";
    switch (_note.type) {
      case EDITION_TYPES.QUILL:
        text = removeHTMLTags(_note.body.substring(0, 30)) + "...";
        break;
      case EDITION_TYPES.MARKDOWN:
        text = getMarkdownText(_note.body.substring(0, 30))) + "...";
        break;

      default:
        break;
    }

    return text;
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
          <ListItemText primary={_note.title}  />
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
