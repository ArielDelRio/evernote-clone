import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "10em",
    height: "10em",
    padding: "1em",
    margin: "1em",
    background: (props) => props.color,
    display: "block",
    transform: (props) => `rotate(${props.rotate})`,
    WebkitTransform: "rotate(4deg)",
    MozTransformOrigin: "rotate(4deg)",

    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },

  editionLogo: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  title: {
    fontWeight: "bold",
    paddingBottom: "10px",
  },
  content: {
    fontFamily: "Reenie Beanie, arial, sans-serif",
    fontWeight: "lighter",
    wordWrap: "break-word",
  },
});

export default useStyles;
