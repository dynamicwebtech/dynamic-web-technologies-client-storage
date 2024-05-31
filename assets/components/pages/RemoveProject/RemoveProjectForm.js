/**
 *
 *  This is the Remove Project Form
 *
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styles from "../../../styles/modules/RemoveProject/RemoveProject.module.css";

export const RemoveProjectForm = ({ projects }) => {
  const [projectName, setProjectName] = useState("");
  const [domainName, setDomainName] = useState("");

  const router = useRouter();

  const handleRemove = async (e) => {
    e.preventDefault();

    if (!projectName || !domainName) {
      alert("Please select both a project name and a domain name.");
      return;
    }

    const userConfirmation = prompt(
      `Are you sure you want to remove this project? 
      
Once deleted, you will not be able to recover it! Also, any clients with this project linked to them will mark the field as "null".

(Enter 'Y', 'Yes' OR 'N', 'No')
`
    );

    if (!userConfirmation) {
      return;
    }

    const userConfirmationAnswer = userConfirmation.toLowerCase();

    if (userConfirmationAnswer === "y" || userConfirmationAnswer === "yes") {
      try {
        const response = await fetch("/api/removeProjects", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectName, domainName }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          alert(data.message);

          router.reload();
        } else {
          console.error(data.error);
          alert(data.error);
        }
      } catch (error) {
        console.error("Error removing project(s):", error);
      }
    } else if (
      userConfirmationAnswer === "n" ||
      userConfirmationAnswer === "no"
    ) {
      alert("Project removal canceled.");
    } else {
      alert("Invalid input. Project removal canceled.");
    }
  };

  return (
    <section id="removeProjectForm" className={`${styles.remove_project_form}`}>
      <div className={`${styles.remove_project_form_inner}`}>
        <span
          className={`${styles.required_text} orientation-change-element half-second`}
        >
          <span style={{ color: "red" }}>*</span> = Required
        </span>

        <form>
          <div className={`${styles.form_divider}`} />

          <div className={`${styles.form_set}`}>
            <label htmlFor="projectName">
              <span>
                <span style={{ color: "red" }}>*</span> Project Name:{" "}
              </span>
            </label>
            <select
              id="projectName"
              name="projectName"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            >
              <option value="">-- SELECT A PROJECT NAME --</option>
              {projects.map((project) => (
                <option key={project._id} value={project.projectName}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles.form_set}`}>
            <label htmlFor="domainName">
              <span>
                <span style={{ color: "red" }}>*</span> Domain Name:{" "}
              </span>
            </label>
            <select
              id="domainName"
              name="domainName"
              value={domainName}
              onChange={(e) => {
                setDomainName(e.target.value);
              }}
            >
              <option value="">-- SELECT A DOMAIN NAME --</option>
              {projects.map((project) => (
                <option key={project._id} value={project.domainName}>
                  {project.domainName}
                </option>
              ))}
            </select>
          </div>

          <div className={`${styles.form_btns}`}>
            <button
              type={"reset"}
              className={`${styles.reset_btn} half-second`}
            >
              CLEAR
            </button>
            <button
              className={`${styles.submit_btn} half-second`}
              onClick={handleRemove}
            >
              REMOVE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
