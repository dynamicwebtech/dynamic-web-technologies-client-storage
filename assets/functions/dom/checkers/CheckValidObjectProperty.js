/**
 *
 *  This is used to CheckValidObjectProperty
 *
 */

export default function CheckValidObjectProperty(property) {
  const VALUES = ["", null, undefined];

  for (let i = 0; i < VALUES.length; i++) {
    if (property !== VALUES[i]) {
      return true;
    } else {
      return false;
    }
  }
}
