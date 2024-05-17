/**
 *
 *  This is the Nav
 *
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

import RemoveStorageVariable from "@/assets/functions/data/storage/RemoveStorageVariable";

import { NAV_LOGO } from "@/assets/cdns/CDNImgs";

import styles from "../../../styles/modules/All/All.module.css";

export const Nav = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const ON_DASHBOARD = router.pathname === "/dashboard";

  // Getting the username
  useEffect(() => {
    if (localStorage.getItem("Current User")) {
      setUsername(localStorage.getItem("Current User"));
    }
  }, [username]);

  return (
    <section id="nav" className={`${styles.nav}`}>
      <div className={`${styles.nav_inner}`}>
        <div className={`${styles.nav_inner_box} container-fluid`}>
          <div className={`${styles.nav_inner_row} row`}>
            <div
              className={`${styles.nav_inner_side} ${styles.nav_L} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
            >
              <div className={`${styles.nav_inner_side_cnt}`}>
                <LazyLoadImage
                  src={NAV_LOGO}
                  className={`orientation-change-element half-second`}
                  alt="Dynamic Web Technologies Logo."
                />
              </div>
            </div>
            <div
              className={`${styles.nav_inner_side} ${styles.nav_R} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
            >
              <div className={`${styles.nav_inner_side_cnt}`}>
                <div className={`${styles.nav_inner_side_cnt_top}`}>
                  {!ON_DASHBOARD ? (
                    <button
                      id="dashBoardBtn"
                      className={`${styles.dashboard_btn} orientation-change-element half-second`}
                      onClick={(e) => {
                        e.preventDefault();

                        router.push("/dashboard");
                      }}
                    >
                      <FaHome className={`${styles.icon}`} />
                    </button>
                  ) : null}

                  <button
                    id="logoutBtn"
                    className={`${styles.logout_btn} orientation-change-element half-second`}
                    onClick={(e) => {
                      e.preventDefault();

                      if (localStorage.getItem("Current User")) {
                        RemoveStorageVariable("local", "Current User");

                        router.push("/");
                      }
                    }}
                  >
                    <span>LOGOUT</span>
                    <MdLogout
                      className={`${styles.icon}`}
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </button>
                </div>

                <div className={`${styles.nav_inner_side_cnt_bottom}`}>
                  <span>
                    Welcome, <span>{username}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
