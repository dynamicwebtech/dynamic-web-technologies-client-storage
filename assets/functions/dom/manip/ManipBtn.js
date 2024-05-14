/**
 *
 *  This is used to manip a buttons style and state
 *
 *  @param {Array} btns - The array of btns
 *  @param {Object} btn - The button element
 *  @param {string} state - The state of the button (disable, enable)
 *
 */

function enableAllBtns(btns) {
  btns.forEach((btn) => {
    btn.style.opacity = 1;
    btn.style.pointerEvents = "auto";
  });
}

export default function ManipBtn(btn, state, btns) {
  // This will enable all the btns
  if (btns) {
    enableAllBtns(btns);
  }

  if (btn) {
    if (state == "enable") {
      btn.style.opacity = 1;
      btn.style.pointerEvents = "auto";
    }

    if (state == "disable") {
      btn.style.opacity = 0.5;
      btn.style.pointerEvents = "none";
    }
  }
}
