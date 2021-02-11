import React from "react";
import { Grid, Hidden, Switch, TextField, Typography } from "@material-ui/core";
import { BorderColor, Visibility, VisibilityOff } from "@material-ui/icons";
import useStyles from "./EditorHeader.style";
import EDITION_TYPES from "../../../EditionTypes";

const MarkdownLogo = EDITION_TYPES.MARKDOWN.logo;
const QuillLogo = EDITION_TYPES.QUILL.logo;

const EditorHeader = ({ title, type, updateTitle, updateType, showPreviewOnSmallScreen, handleShowPreviewOnSmallScreen }) => {
  const classes = useStyles();
  return (
    <div className={classes.titleInput}>
      <Grid container justify="space-between" alignItems="flex-end">
        <Grid style={{ display: "inline-flex" }}>
          <BorderColor className={classes.editIcon} />
          <TextField
            inputProps={{
              className: classes.input,
            }}
            placeholder="Note title..."
            value={title || ""}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              {type === EDITION_TYPES.MARKDOWN.id && 
                <Hidden smUp>
                  <Grid item>
                    <Switch
                      checked={showPreviewOnSmallScreen}
                      color="primary"
                      icon={<VisibilityOff />}
                      checkedIcon={<Visibility />}
                      classes={{
                        track: classes.switch_track,
                        switchBase: classes.switch_base,
                        colorPrimary: classes.switch_primary,
                      }}
                      onChange={handleShowPreviewOnSmallScreen}
                    />
                  </Grid>
                </Hidden>
              }
              <Grid item>
                <Switch
                  checked={type === EDITION_TYPES.MARKDOWN.id}
                  color="primary"
                  icon={<QuillLogo />}
                  checkedIcon={<MarkdownLogo />}
                  classes={{
                    track: classes.switch_track,
                    switchBase: classes.switch_base,
                    colorPrimary: classes.switch_primary,
                  }}
                  onChange={(e) => updateType(e.target.checked)}
                />
              </Grid>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default EditorHeader;
