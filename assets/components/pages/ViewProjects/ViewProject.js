/**
 *
 *  This is the View Project
 *
 */

import React, { useState, useEffect } from "react";

import { FaTimes } from "react-icons/fa";

import ManipModalStatus from "@/assets/functions/dom/manip/ManipModalStatus";

import styles from "../../../styles/modules/ViewProjects/ViewProjects.module.css";

export const ViewProject = ({ project }) => {
  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function ManipModalStatus_CB() {
    const VIEW_PROJECT = document.getElementById(
      `viewProject_PID_${project._id}`
    );

    const VIEW_PROJECT_INNER = VIEW_PROJECT.querySelector(".modal-inner");

    VIEW_PROJECT_INNER.scrollTo(0, 0);

    ManipModalStatus(VIEW_PROJECT, false);
  }

  return (
    <div
      className={`${styles.view_project}`}
      id={`viewProject_PID_${project._id}`}
    >
      <div
        className={`${styles.darken}`}
        onClick={() => {
          ManipModalStatus_CB();
        }}
      />

      <div className={`${styles.view_project_inner} modal-inner`}>
        <div className={`${styles.view_project_inner_top}`}>
          <span className={`${styles.modal_name}`}>View Project</span>

          <button
            className="half-second"
            onClick={() => {
              ManipModalStatus_CB();
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div className={`${styles.view_project_inner_main}`}>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Project ID:</span>
            <span>{project.projectID}</span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Project Name:</span>
            <span>{project.projectName}</span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Domain Name:</span>
            <span
              className={`${styles.set_link}`}
              onClick={() => {
                const URL = project.domainName.startsWith("http")
                  ? project.domainName
                  : `https://${project.domainName}`;
                window.location.href = URL;
              }}
            >
              {project.domainName}
            </span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Creation Date:</span>
            <span>{project.creationDate}</span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Package Type:</span>
            <span>{project.packageType}</span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Are We Hosting?:</span>
            <span>
              {project.isHosting !== null && project.isHosting !== undefined
                ? project.isHosting.toString()
                : "false"}
            </span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Hosting Price:</span>
            {project.hostingPrice !== null &&
            project.hostingPrice !== "" &&
            project.hostingPrice !== undefined ? (
              <span>{CURRENCY_FORMATTER.format(project.hostingPrice)}</span>
            ) : (
              "null"
            )}
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Renewal Day:</span>
            {project.renewalDay !== null &&
            project.renewalDay !== "" &&
            project.renewalDay !== undefined ? (
              <span>{project.renewalDay}</span>
            ) : (
              "null"
            )}
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Website Type:</span>
            <span>{project.websiteType}</span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Additional Add-Ons:</span>
            <ul>
              {project.additionalAddOns.map((addOn) => (
                <li key={addOn}>{addOn}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Has A Custom Price?:</span>
            <span>
              {project.isCustomPrice !== null &&
              project.isCustomPrice !== undefined
                ? project.isCustomPrice.toString()
                : "false"}
            </span>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Custom Price:</span>
            {project.customPrice !== null &&
            project.customPrice !== "" &&
            project.customPrice !== undefined ? (
              <span>{CURRENCY_FORMATTER.format(project.customPrice)}</span>
            ) : (
              "null"
            )}
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Comments/Notes:</span>
            <ul>
              {project.projectCommentsNotes.map((cN) => (
                <li key={cN}>{cN}</li>
              ))}
            </ul>
          </div>
          <div className={`${styles.view_project_set}`}>
            <span className={`${styles.set_name}`}>Grand Total:</span>
            {project.projectGrandTotal !== null &&
            project.projectGrandTotal !== "" &&
            project.projectGrandTotal !== undefined ? (
              <span>
                {CURRENCY_FORMATTER.format(project.projectGrandTotal)}
              </span>
            ) : (
              "null"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
