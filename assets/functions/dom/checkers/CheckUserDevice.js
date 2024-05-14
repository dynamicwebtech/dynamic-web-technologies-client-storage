/**
 *
 *  This is used to check what device the user is on
 *
 *  @param {boolean} mobile - The mobile variable
 *  @param {boolean} desktop - The desktop variable
 *
 */

// Function imports
import DeclareStorageVariable from "../../data/storage/DeclareStorageVariable";
import RemoveStorageVariable from "../../data/storage/RemoveStorageVariable";

export default function CheckUserDevice(mobile, desktop) {
  if (window.innerWidth > 769) {
    mobile = false;
    desktop = true;

    if (desktop) {
      RemoveStorageVariable("session", "Mobile Device");
      DeclareStorageVariable("session", "Desktop Device", true);
    }
  }

  if (window.innerWidth <= 768) {
    mobile = true;
    desktop = false;

    if (mobile) {
      RemoveStorageVariable("session", "Desktop Device");
      DeclareStorageVariable("session", "Mobile Device", true);
    }
  }
}
