/**
 *
 *  This is used to manip if a modal is open or not
 *
 */

import ManipVisibility from "./ManipVisibility";

export default function ManipModalStatus(element, status) {
  if (status === true) {
    document.body.style.overflowY = "hidden";
    document.body.style.pointerEvents = "none";

    element.style.overflowY = "auto";
    element.style.pointerEvents = "auto";

    ManipVisibility(element, "visible");
  } else {
    element.style.overflowY = "hidden";
    element.style.pointerEvents = "hidden";

    ManipVisibility(element, "hidden");

    document.body.style.overflowY = "auto";
    document.body.style.pointerEvents = "auto";
  }
}
