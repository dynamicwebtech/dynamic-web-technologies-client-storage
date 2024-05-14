/**
 *
 *  This is used to enable/disable a element
 *
 *  @param {Object} element - This is the element that will be manipulated
 *  @param {string} status - This is used to indicate either to enable or disable the element
 *
 */

export default function ManipElement(element, status) {
  if (element) {
    if (status == "enable") {
      element.style.pointerEvents = "auto";
      element.style.opacity = 1;
    }

    if (status == "disable") {
      element.style.pointerEvents = "none";
      element.style.opacity = 0.5;
    }
  } else {
    console.log(element + " does not exist..");
  }
}
