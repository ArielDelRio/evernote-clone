import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  splashContent: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: "30vh",
    animation: `$zoomEffect 2000ms infinite running ${theme.transitions.easing.easeInOut}`,
    WebkitAnimation: `$zoomEffect 2000ms infinite running ${theme.transitions.easing.easeInOut}`,
    MozAnimation: `$zoomEffect 2000ms infinite running ${theme.transitions.easing.easeInOut}`,
  },

  logo: {
    maxHeight: "50vw",
  },

  "@keyframes zoomEffect": {
    "0%": {
      transform: "scale(.9, .9)",
    },
    "50%": {
      transform: "scale(1, 1)",
    },
    "100%": {
      transform: "scale(.9, .9)",
    },
  },
}));

export default useStyles;
