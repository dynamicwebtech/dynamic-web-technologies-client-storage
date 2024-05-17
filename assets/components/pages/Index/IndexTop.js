/**
 *
 *  This is the IndexTop
 *
 */

import { LazyLoadImage } from "react-lazy-load-image-component";

import { NAV_LOGO } from "@/assets/cdns/CDNImgs";

import styles from "../../../styles/modules/Index/Index.module.css";

export const IndexTop = () => {
  return (
    <section id="indexTop" className={`${styles.index_top}`}>
      <div className={`${styles.index_top_inner}`}>
        <LazyLoadImage src={NAV_LOGO} alt="Dyanmic Web Technologies Logo." />

        <h1 className="orientation-change-element half-second">
          Clients/Projects Database
        </h1>
      </div>
    </section>
  );
};
