import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import EDITION_TYPES, { DEFAULT_TYPE } from "../../EditionTypes";
import useStyles from "./Dialog.style";

export default function FormDialog({
  newNoteDialogOpen,
  handleCloseDialog,
  newNote,
}) {
  const classes = useStyles();

  const [newNoteState, setnewNoteState] = useState({
    title: "",
    type: DEFAULT_TYPE,
  });

  const handleNewNote = () => {
    const titleToAdd = newNoteState.title.trim();
    if (titleToAdd.length) {
      newNote(newNoteState);
      setnewNoteState({ title: "", type: DEFAULT_TYPE });
    }
  };

  return (
    <div>
      <Dialog
        open={newNoteDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Note</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formControl}
            autoFocus
            margin="dense"
            id="title"
            label="Set title"
            type="text"
            onChange={(e) =>
              setnewNoteState({ ...newNoteState, title: e.target.value })
            }
          />
          <FormControl className={classes.formControl} margin="dense">
            <InputLabel id="edition_type">Type</InputLabel>
            <Select
              labelId="edition_type"
              value={DEFAULT_TYPE.id}
              onChange={(e) =>
                setnewNoteState({ ...newNoteState, type: e.target.value })
              }
            >
              {Object.values(EDITION_TYPES).map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleNewNote} color="primary">
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
