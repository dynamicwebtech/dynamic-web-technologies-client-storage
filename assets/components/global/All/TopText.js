/**
 *
 *  This is the Top Text
 *
 */

export const TopText = (props) => {
  const TOP_TEXT_OBJ = props.topTextObj;

  let hasBottomText = TOP_TEXT_OBJ.hasBottomText;

  const STYLES = TOP_TEXT_OBJ.styles;
  const HEADING_TEXT = TOP_TEXT_OBJ.headingText;
  const BOTTOM_TEXT = TOP_TEXT_OBJ.bottomText;

  return (
    <section id="topText" className={`${STYLES.top_text}`}>
      <div className={`${STYLES.top_text_inner}`}>
        <h1 className="orientation-change-element half-second">
          {HEADING_TEXT}
        </h1>

        {hasBottomText ? (
          <p className="orientation-change-element half-second">
            {BOTTOM_TEXT}
          </p>
        ) : null}
      </div>
    </section>
  );
};
