import React, { useEffect, useState } from "react";
import axios from "axios";
import "./app.css";
import clsx from "clsx";
import styles from "./app.style";

import { io } from "socket.io-client";

import { DOMAIN, PORT } from "./config";

import { Box, Button, Divider, LinearProgress } from "@material-ui/core";
import PlusIcon from "@material-ui/icons/AddCircle";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import Header from "./components/header/Header.components";
import Drawer from "./components/drawer/Drawer.component";
import DialogForm from "../src/components/dialog/Dialog.components";
import Editor from "./components/editor/Editor.component";
import NotesList from "./components/notes-list/NotesList.component";
import StickyNote from "./components/sticky-note/StickyNote";
import SplashLoading from "./components/splash-loading/SplashLoading";

const Dashboard = ({ logout, user_token }) => {
  const classes = styles();
  const [state, setState] = useState({
    selectedNoteIndex: null,
    selectedNote: null,
    notes: [],
    isLoading: false,
    isDrawerOpen: true,
    newNoteDialogOpen: false,
  });

  useEffect(() => {
    const socket = io(`${DOMAIN}/`, { query: `user_token=${user_token}` });

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
    console.log(note, index);
    setState((prevState) => ({
      ...prevState,
      selectedNoteIndex: index,
      selectedNote: note,
    }));
  };

  const newNote = async ({ title, type }) => {
    const response = await axios.post(`${DOMAIN}/notes`, {
      user_token: user_token,
      title: title,
      type: type,
      body: "",
    });

    const selectedNote = {
      id: response.data,
      title: title,
      type: type,
      body: "",
    };

    setState({
      ...state,
      notes: [...state.notes, selectedNote],
      selectedNote: selectedNote,
      selectedNoteIndex: state.notes.length,
      newNoteDialogOpen: false,
      isDrawerOpen: false,
    });
  };

  const noteUpdate = async (id, note) => {
    const response = await axios.put(`${DOMAIN}/notes/${id}`, {
      user_token: user_token,
      note: note,
    });
  };

  const deleteNote = async (note) => {
    const noteIndex = state.notes.indexOf(note);
    if (state.selectedNoteIndex === noteIndex) {
      setState({ ...state, selectedNote: null, selectedNoteIndex: null });
    }
    const response = await axios.delete(
      `${DOMAIN}/notes/${note.id}/${user_token}`
    );
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
              classes={{ root: classes.newNoteBtn }}
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

          {state.isLoading && <LinearProgress />}

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
        ) : state.isLoading || !state.notes.length ? (
          <SplashLoading />
        ) : (
          <div className={classes.dashboard}>
            {state.notes.map((note, index) => {
              return (
                <div key={note.id} onClick={() => selectNote(note, index)}>
                  <StickyNote note={note} number={index} />
                </div>
              );
            })}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
