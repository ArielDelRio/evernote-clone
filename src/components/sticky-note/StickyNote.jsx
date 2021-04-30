import React from "react";
import useStyles from "./StickyNote.style";

import { Paper, Typography } from "@material-ui/core";
import { getTextPreview } from "../../helper";
import EDITION_TYPES from "../../EditionTypes";

const StickyNote = ({ note, number }) => {
  const classes = useStyles({
    color: number % 2 ? "#ccf" : "#ffc",
    rotate: number % 2 ? "4deg" : "-4deg",
  });

  const Logo = EDITION_TYPES[note.type].logo;

  return (
    <Paper className={classes.root} elevation={4}>
      <div className={classes.editionLogo}>
        <Logo width={"1.36em"} />
      </div>
      <Typography variant="h4" className={classes.title}>
        {note.title}
      </Typography>
      <Typography className={classes.content}>
        {getTextPreview(note, 90)}
      </Typography>
    </Paper>
  );
};

export default StickyNote;
