import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";
import clsx from "clsx";
import styles from "./app.style";

import { io } from "socket.io-client";

import { DOMAIN } from "./config";

import { Box, Button, Divider, LinearProgress } from "@material-ui/core";
import PlusIcon from "@material-ui/icons/AddCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import Auth from "./components/auth/Auth.component";
import Header from "./components/header/Header.components";
import Drawer from "./components/drawer/Drawer.component";
import DialogForm from "../src/components/dialog/Dialog.components";
import Editor from "./components/editor/Editor.component";
import NotesList from "./components/notes-list/NotesList.component";

const App = () => {
  const classes = styles();
  const [state, setState] = useState({
    selectedNoteIndex: null,
    selectedNote: null,
    notes: [],
    isLoading: false,
    isDrawerOpen: true,
    newNoteDialogOpen: false,
    isAuth: true,
  });

  useEffect(() => {
    const socket = io(DOMAIN);
    setState({ ...state, isLoading: true });
    socket.on("GET_NOTES", (data) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        notes: data,
      }));
    });
  }, []);

  const selectNote = (note, index) => {
    setState((prevState) => ({
      ...prevState,
      selectedNoteIndex: index,
      selectedNote: note,
    }));
  };

  const newNote = async ({ title, type }) => {
    const response = await axios.post(`${DOMAIN}/notes`, {
      title: title,
      type: type,
    });

    const selectedNote = {
      id: response.data.id,
      title: title,
      type: type,
      body: "",
    };

    setState({
      ...state,
      selectedNote: selectedNote,
      selectedNoteIndex: state.notes.length,
      newNoteDialogOpen: false,
      isDrawerOpen: false,
    });
  };

  const noteUpdate = async (id, note) => {
    const response = await axios.put(`${DOMAIN}/notes/${id}`, {
      note: note,
    });
  };

  const deleteNote = async (note) => {
    const noteIndex = state.notes.indexOf(note);
    if (state.selectedNoteIndex === noteIndex) {
      setState({ ...state, selectedNote: null, selectedNoteIndex: null });
    }
    const response = await axios.delete(`${DOMAIN}/notes/${note.id}`);
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

  const authenticate = (userAuthenticate) => {
    console.log(userAuthenticate);
    setState({ ...state, isAuth: true });
  };

  const logout = async () => {
    console.log("logout");
    const response = await axios.post(`${DOMAIN}/auth/logout`);

    console.log(response.data);

    setState({ ...state, isAuth: false });
  };

  console.log(state);
  return state.isAuth ? (
    <div className="app-container">
      <Header
        isDrawerOpen={state.isDrawerOpen}
        handleDrawerToggle={(event) => handleDrawerToggle(event)}
        logout={logout}
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

          {state.isLoading && <LinearProgress disableShrink />}

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
            noteUpdate={noteUpdate}
          />
        ) : (
          <div className={classes.dashboard}>
            <img src="./react.png" alt="Evernote dashboard Logo" />
          </div>
        )}
      </Box>
    </div>
  ) : (
    <Auth authenticate={authenticate} />
  );
};

export default App;
