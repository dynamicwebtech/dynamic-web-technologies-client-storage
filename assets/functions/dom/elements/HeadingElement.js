/**
 *
 *  This is the Heading element
 *
 */

export default function HeadingElement(textA, textB) {
  // If there is textB, add a <br/>. If not, only return textA
  if (textB) {
    return (
      <>
        {textA} <br /> {textB}
      </>
    );
  } else {
    return { textA };
  }
}
