/**
 *
 *  This is the Customer Chat Iframe
 *
 */

import styles from "../../../styles/modules/All/All.module.css";

export const CompanyEmailIFrame = () => {
  return (
    <div id="companyEmailIF" className={`${styles.iframe}`}>
      <div
        className={`${styles.darken}`}
        onClick={(e) => {
          e.preventDefault();

          document.getElementById("companyEmailIF").style.display = "none";

          //   document.body.style.overflowY = "auto";
          //   document.body.style.pointerEvents = "auto";
        }}
      />

      <iframe
        src="https://privateemail.com/"
        width="100%"
        height="600px"
        frameborder="0"
      />
    </div>
  );
};
