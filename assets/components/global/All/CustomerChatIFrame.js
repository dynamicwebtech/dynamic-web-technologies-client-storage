/**
 *
 *  This is the Customer Chat Iframe
 *
 */

import styles from "../../../styles/modules/All/All.module.css";

export const CustomerChatIFrame = () => {
  return (
    <div id="customerChatIF" className={`${styles.iframe}`}>
      <div
        className={`${styles.darken}`}
        onClick={(e) => {
          e.preventDefault();

          document.getElementById("customerChatIF").style.display = "none";

          //   document.body.style.overflowY = "auto";
          //   document.body.style.pointerEvents = "auto";
        }}
      />

      <iframe
        src="https://dashboard.tawk.to/#/chat"
        width="100%"
        height="600px"
        frameborder="0"
      />
    </div>
  );
};
