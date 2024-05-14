/**
 *
 *  This is used to manip the column classnames
 *
 */

export default function ManipColumnClassnames(index, totalColumns) {
  const isOddNumber = totalColumns % 2 !== 0;

  if (isOddNumber && index === totalColumns - 1) {
    return "col-lg-6 col-md-6 col-sm-6 col-xs-12 offset-lg-3"; // Center the last column if odd number of columns
  } else {
    return "col-lg-6 col-md-6 col-sm-6 col-xs-12"; // Your existing classes for two columns
  }
}
