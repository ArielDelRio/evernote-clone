import React, { useState } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import useStyles from "./NotesList.style";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EDITION_TYPES from "../../EditionTypes";
import { removeHTMLTags, getMarkdownText } from "../../helper";
import Alert from "../alert/Alert.component";

const NotesList = ({
  selectNote,
  deleteNote,
  notes,
  selectedNoteIndex,
  handleDrawerToggle,
}) => {
  const classes = useStyles();
  const smScreen = useMediaQuery("(max-width:600px)");

  const [deleteAlertState, setdeleteAlertState] = useState({
    open: false,
    _note: null,
  });

  const handleSelectNote = (_note, _index, event) => {
    if (smScreen) handleDrawerToggle(event);
    selectNote(_note, _index);
  };

  const handleDeleteNote = (_note, event) => {
    event.stopPropagation();
    setdeleteAlertState({
      open: true,
      _note: _note,
    });
  };

  const closeAlert = () => {
    setdeleteAlertState({
      _note: null,
      open: false,
    });
  };

  const confirmAlert = () => {
    deleteNote(deleteAlertState._note);
    setdeleteAlertState({
      _note: null,
      open: false,
    });
  };

  const getTextPreview = (_note) => {
    switch (_note.type) {
      case EDITION_TYPES.QUILL.id:
        return removeHTMLTags(_note.body.substring(0, 20)) + "...";
      case EDITION_TYPES.MARKDOWN.id:
        return (
          removeHTMLTags(getMarkdownText(_note.body).substring(0, 20)) + "..."
        );
      default:
        break;
    }
  };

  return (
    <>
      {notes.length ? (
        <List disablePadding>
          {notes.map((_note, _index) => {
            const textPreview = getTextPreview(_note);
            const Logo = EDITION_TYPES[_note.type].logo;
            return (
              <div key={_index}>
                <ListItem
                  className={classes.listItem}
                  selected={selectedNoteIndex === _index}
                  alignItems="flex-start"
                  onClick={(event) => handleSelectNote(_note, _index, event)}
                >
                  <div className={classes.textSection}>
                    <ListItemText
                      primary={_note.title}
                      secondary={textPreview}
                    />
                    <DeleteIcon
                      onClick={(event) => handleDeleteNote(_note, event)}
                      className={classes.deleteIcon}
                    />
                    <ListItemIcon
                      className={classes.typeIcon}
                      classes={{
                        root: classes.root,
                        alignItemsFlexStart: classes.alignItemsFlexStart,
                      }}
                    >
                      <Logo width={"1.36em"} />
                    </ListItemIcon>
                  </div>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      ) : (
        <Typography className={classes.noNotesInfo}>
          There are no notes
        </Typography>
      )}
      {deleteAlertState._note && (
        <Alert
          deleteAlertState={deleteAlertState}
          closeAlert={closeAlert}
          confirmAlert={confirmAlert}
        />
      )}
    </>
  );
};

export default NotesList;
