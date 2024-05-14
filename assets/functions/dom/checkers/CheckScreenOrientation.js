/**
 *
 *  This is used to check if the screen's orientation changes and will remove/add classes
 *
 *  @param {string} elements - The name for each element in the elements array
 *  @param {string} className - The class name string for the class added to each element
 *
 */

function RemoveAddClass(elements, className) {
  /**
   * This is used to remove/add a half-second class to a resizing element
   */
  document.querySelectorAll(elements).forEach((element) => {
    if (element.classList.contains(className)) {
      // Checks if the orientation-change-element has the half-second class
      element.classList.remove(className); // Removes it

      setTimeout(() => {
        element.classList.add(className); // Adds it back
      }, 1500);
    }
  });
}

export default function CheckScreenOrientation() {
  const ORIENTATION = window.orientation;

  // 0 Degrees / 180 Degrees
  if (ORIENTATION == 0 || ORIENTATION == 180) {
    console.log("Orientation: Portrait");

    RemoveAddClass(".orientation-change-element", "half-second");
  }

  // 90 Degrees / -90 Degrees
  if (ORIENTATION == 90 || ORIENTATION == -90) {
    console.log("Orientation: Landscape");

    RemoveAddClass(".orientation-change-element", "half-second");
  }
}
