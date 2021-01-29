import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  deleteAlertState,
  closeAlert,
  confirmAlert,
}) {
  console.log(deleteAlertState);
  return (
    <Dialog
      open={deleteAlertState.open}
      onClose={closeAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete note : {deleteAlertState._note.title} ?
      </DialogTitle>
      <DialogActions>
        <Button variant="text" onClick={closeAlert} color="primary">
          CANCEL
        </Button>
        <Button
          variant="contained"
          onClick={confirmAlert}
          color="secondary"
          autoFocus
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}
