/**
 *
 *  This is the Dashboard Main
 *
 */

import { useRouter } from "next/router";

import { IoPersonSharp } from "react-icons/io5";
import { TiMinus, TiPlus } from "react-icons/ti";

import { FaTools } from "react-icons/fa";

import styles from "../../../styles/modules/Dashboard/Dashboard.module.css";

export const DashboardMain = () => {
  const router = useRouter();

  const DASHBOARD_LINKS = [
    {
      linkID: "link_1",
      linkName_A: "View",
      linkName_B: "Clients",
      linkIcon: [<IoPersonSharp />],
      linkRoute: "/view_clients",
    },
    {
      linkID: "link_2",
      linkName_A: "Add",
      linkName_B: "Client(s)",
      linkIcon: [<TiPlus />, <IoPersonSharp />],
      linkRoute: "/add_client",
    },
    {
      linkID: "link_3",
      linkName_A: "Remove",
      linkName_B: "Client(s)",
      linkIcon: [<TiMinus />, <IoPersonSharp />],
      linkRoute: "/remove_client",
    },
    {
      linkID: "link_4",
      linkName_A: "View",
      linkName_B: "Projects",
      linkIcon: [<FaTools />],
      linkRoute: "/view_projects",
    },
    {
      linkID: "link_5",
      linkName_A: "Add",
      linkName_B: "Project(s)",
      linkIcon: [<TiPlus />, <FaTools />],
      linkRoute: "/add_project",
    },
    {
      linkID: "link_6",
      linkName_A: "Remove",
      linkName_B: "Project(s)",
      linkIcon: [<TiMinus />, <FaTools />],
      linkRoute: "/remove_project",
    },
  ];

  return (
    <section id="dashboardMain" className={`${styles.dashboard_main}`}>
      <div className={`${styles.dashboard_main_inner}`}>
        <h1 className="orientation-change-element half-second">
          User
          <br />
          <span> </span>
          Dashboard
        </h1>

        <div className={`${styles.dashboard_main_inner_links}`}>
          <div
            className={`${styles.dashboard_main_inner_links_box} container-fluid`}
          >
            <div className={`${styles.dashboard_main_inner_links_row} row`}>
              {DASHBOARD_LINKS.map((link) => (
                <div
                  key={link.linkID}
                  className={`${styles.dashboard_main_inner_links_side} col-lg-4 col-md-6 col-sm-12 col-xs-12`}
                  onClick={() => {
                    router.push(link.linkRoute);
                  }}
                >
                  <div
                    className={`${styles.dashboard_main_inner_links_side_cnt}`}
                  >
                    <span className="orientation-change-element half-second">
                      {link.linkName_A} <br /> {link.linkName_B}
                    </span>

                    <div className={`${styles.icon_holder}`}>
                      {link.linkIcon.map((icon) => (
                        <div>{icon}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
