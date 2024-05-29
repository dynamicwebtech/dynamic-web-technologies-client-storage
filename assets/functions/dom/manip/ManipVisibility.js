/**
 *
 *  This is used to manip the visibility of an element
 *
 */

export default function ManipVisibility(element, status) {
  if (status === "visible") {
    element.style.opacity = 1;
    element.style.visibility = "visible";
  } else {
    element.style.opacity = 0;
    element.style.visibility = "hidden";
  }
}
