import marked from "marked";
import TurndownService from "turndown";
import DOMPurify from "dompurify";
import EDITION_TYPES from "./EditionTypes";

export default function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

export function getTextPreview(_note, countOfCharacters = 20) {
  switch (_note.type) {
    case EDITION_TYPES.QUILL.id:
      return removeHTMLTags(_note.body.substring(0, countOfCharacters)) + "...";
    case EDITION_TYPES.MARKDOWN.id:
      return (
        removeHTMLTags(
          getMarkdownText(_note.body).substring(0, countOfCharacters)
        ) + "..."
      );
    default:
      break;
  }
}

export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, "");
}

export function getMarkdownText(str) {
  var rawMarkup = marked(str, { sanitize: true });
  const markDown = DOMPurify.sanitize(rawMarkup, {
    USE_PROFILES: { html: true },
  });
  return markDown;
}

export function htmlToMarkdown(str) {
  const turndownService = new TurndownService();
  const markRes = turndownService.turndown(str);
  return markRes;
}
