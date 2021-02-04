import React from "react";

const EDITION_TYPES = {
  QUILL: {
    id: "QUILL",
    name: "Quill",
    logo: ({ width, height }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width={width || "1em"}
        height={height || "1em"}
        style={{
          msTransform: "rotate(360deg)",
          WebkitTransform: "rotate(360deg)",
          transform: "rotate(360deg)",
        }}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <path
          d="M0 16C2 10 7.234 0 16 0c-4.109 3.297-6 11-9 11H4l-3 5H0z"
          fill="#626262"
        />
      </svg>
    ),
  },
  MARKDOWN: {
    id: "MARKDOWN",
    name: "Markdown",
    logo: ({ width, height }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width={width || "1em"}
        height={height || "1em"}
        style={{
          msTransform: "rotate(360deg)",
          WebkitTransform: "rotate(360deg)",
          transform: "rotate(360deg)",
        }}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 256 158"
      >
        <path
          d="M238.371 157.892H18.395C8.431 157.892 0 149.462 0 139.497V18.395C0 8.431 8.431 0 18.395 0h219.21C247.569 0 256 8.431 256 18.395v121.102c0 9.964-7.665 18.395-17.629 18.395zM18.395 12.263c-3.066 0-6.132 3.066-6.132 6.132v121.102c0 3.832 3.066 6.132 6.132 6.132h219.21c3.832 0 6.132-3.066 6.132-6.132V18.395c0-3.832-3.066-6.132-6.132-6.132H18.395zM36.79 121.102V36.79h24.527l24.527 30.66l24.527-30.66h24.527v84.312h-24.527V72.814l-24.527 30.66l-24.527-30.66v48.288H36.79zm154.06 0l-36.79-40.623h24.527V36.79h24.527v42.923h24.527l-36.79 41.389z"
          fill="#000"
        />
      </svg>
    ),
  },
};

export const DEFAULT_TYPE = EDITION_TYPES.QUILL;
export default EDITION_TYPES;
