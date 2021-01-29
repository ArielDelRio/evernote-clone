import React, { Component, useEffect, useState } from "react";
import "./app.css";

import firebase from "firebase";

import Sidebar from "./components/sidebar/Sidebar.component";

import PlusIcon from "@material-ui/icons/AddCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import Editor from "./components/editor/Editor.component";
import Header from "./components/header/Header.components";
import Drawer from "./components/drawer/Drawer.component";
import NotesList from "./components/notes-list/NotesList.component";
import { Box, Button, Divider } from "@material-ui/core";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import DialogForm from "../src/components/dialog/Dialog.components";

import Auth from './components/auth/Auth.component';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  newNoteBtn: {
    height: "4rem",
    color: theme.palette.success.main,
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },

  dashboard: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: "35vh",
  },
}));

const App = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    selectedNoteIndex: null,
    selectedNote: null,
    notes: [],
    isDrawerOpen: true,
    newNoteDialogOpen: false,
    isOffline: false,
    isAuth: false,
  });

  useEffect(() => {
    if (state.isAuth)
      firebase
        .firestore()
        .collection("notes")
        .orderBy("timestamp")
        .onSnapshot((serverUpdate) => {
          const notes = serverUpdate.docs.map((_doc) => {
            const data = _doc.data();
            data["id"] = _doc.id;
            return data;
          });
          setState((prevState) => ({ ...prevState, notes: notes }));
        });
  }, []);

  const selectNote = (note, index) => {
    setState((prevState) => ({
      ...prevState,
      selectedNoteIndex: index,
      selectedNote: note,
    }));
  };

  const newNote = async (title) => {
    const newNotefromDB = await firebase.firestore().collection("notes").add({
      title: title,
      body: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const selectedNote = {
      id: newNotefromDB.id,
      title: title,
      body: "",
    };

    console.log(state.notes);

    setState({
      ...state,
      selectedNote: selectedNote,
      selectedNoteIndex: state.notes.length,
      newNoteDialogOpen: false,
      isDrawerOpen: false,
    });
  };

  const noteUpdate = (id, note) => {
    console.log("update");
    firebase.firestore().collection("notes").doc(id).update({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const deleteNote = (note) => {
    const noteIndex = state.notes.indexOf(note);
    if (state.selectedNoteIndex === noteIndex) {
      setState({ ...state, selectedNote: null, selectedNoteIndex: null });
    }
    firebase.firestore().collection("notes").doc(note.id).delete();
  };

  const handleDrawerToggle = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  };

  console.log(state);
  return (
    state.isAuth ? (
      <div className="app-container">
        <Header
          isDrawerOpen={state.isDrawerOpen}
          handleDrawerToggle={(event) => handleDrawerToggle(event)}
        >
          <Drawer
            isDrawerOpen={state.isDrawerOpen}
            listItems={state.notes}
            handleDrawerToggle={(event) => handleDrawerToggle(event)}
          >
            <div className={classes.drawerHeader}>
              <Button
                variant="text"
                color="primary"
                className={classes.newNoteBtn}
                startIcon={<PlusIcon />}
                onClick={() => setState({ ...state, newNoteDialogOpen: true })}
              >
                Add Note
            </Button>
              <IconButton onClick={handleDrawerToggle}>
                {state.isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />

            <NotesList
              handleDrawerToggle={(event) => handleDrawerToggle(event)}
              notes={state.notes}
              selectNote={selectNote}
              deleteNote={deleteNote}
              selectedNoteIndex={state.selectedNoteIndex}
            />
          </Drawer>
        </Header>

        <div className={classes.drawerHeader} />

        <DialogForm
          handleCloseDialog={() =>
            setState({ ...state, newNoteDialogOpen: false })
          }
          newNoteDialogOpen={state.newNoteDialogOpen}
          newNote={newNote}
        />

        <Box
          className={clsx(classes.content, {
            [classes.contentShift]: state.isDrawerOpen,
          })}
        >
          {state.selectedNote ? (
            <Editor
              selectedNote={state.selectedNote}
              selectedNoteIndex={state.selectedNoteIndex}
              notes={state.notes}
              noteUpdate={noteUpdate}
            />
          ) : (
              <div className={classes.dashboard}>
                <img src="./react.png" />
              </div>
            )}
        </Box>
      </div>
    ) : <Auth />
  );
};

export default App;
