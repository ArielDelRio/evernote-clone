import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({
  newNoteDialogOpen,
  handleCloseDialog,
  newNote,
}) {
  const [title, setTitle] = useState("");

  const handleNewNote = () => {
    const titleToAdd = title.trim();
    if (titleToAdd.length) {
      newNote(titleToAdd);
      setTitle("");
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
            autoFocus
            margin="dense"
            id="title"
            label="Set title"
            type="text"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
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
