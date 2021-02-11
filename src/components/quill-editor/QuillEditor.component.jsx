import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar.component";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import useStyles from "./QuillEditor.style";

export const QuillEditor = ({ content, handleUpdateBody }) => {
  const classes = useStyles();
  const [lastRecording, setLastRecording] = useState("");
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    var re = new RegExp(`${lastRecording}(</\\w+>)$`, "g");
    const contentWithVoice = content.replace(re, ` ${transcript}$1`);
    setLastRecording(transcript);
    handleUpdateBody(contentWithVoice);

    // component unmounted stopListening
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [transcript]);

  const handleVoiceRecording = async () => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser not support speech recognition");
      return null;
    }

    if (listening) {
      await SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      await SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <Box
      className={classes.editor_container}
      display="flex"
      flexDirection="column"
    >
      <EditorToolbar
        listening={listening}
        handleVoiceRecording={handleVoiceRecording}
        supportsSpeechRecognition={SpeechRecognition.browserSupportsSpeechRecognition()}
      />
      <Box flex={1} overflow="auto">
        <ReactQuill
          className={classes.quill}
          readOnly={listening}
          value={content}
          onChange={handleUpdateBody}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </Box>
    </Box>
  );
};

export default QuillEditor;
