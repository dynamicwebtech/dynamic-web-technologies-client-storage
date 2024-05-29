/**
 *
 *  This is the View Projects Main
 *
 */

import ManipModalStatus from "@/assets/functions/dom/manip/ManipModalStatus";
import styles from "../../../styles/modules/ViewProjects/ViewProjects.module.css";

const TEST_COMPONENT = (
  { projects, loading } // Destructure props properly
) => (
  <div>
    {!loading ? (
      projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id}>
            <br />
            <p>Project ID: {project.projectID}</p>
            <p>Project Name: {project.projectName}</p>
            <p>Project Name ID: {project.projectNameID}</p>
            <p>Domain Name: {project.domainName}</p>
            <p>Creation Date: {project.creationDate}</p>
            <p>Package Type: {project.packageType}</p>
            <p>Are We Hosting?: {project.isHosting.toString()}</p>
            <p>
              Hosting Price: $
              {project.hostingPrice
                ? Number(project.hostingPrice).toFixed(2)
                : "0.00"}
            </p>
            <p>
              Renewal Day: {project.renewalDay ? project.renewalDay : "No Day"}
            </p>
            <p>Website Type: {project.websiteType}</p>
            <div>
              <span>Additional Add-ons:</span>
              <ul>
                {project.additionalAddOns.map((addOn) => (
                  <li key={addOn}>- {addOn}</li>
                ))}
              </ul>
            </div>
            <p>
              Additional Pages:{" "}
              {project.additionalPages ? project.additionalPages : 0}
            </p>
            <p>Custom Price?: {project.isCustomPrice.toString()}</p>
            <p>
              Custom Price: $
              {project.customPrice
                ? Number(project.customPrice).toFixed(2)
                : "0.00"}
            </p>

            <div>
              <span>Project Comments/Notes:</span>
              <ul>
                {project.projectCommentsNotes.map((cN) => (
                  <li key={cN}>- {cN}</li>
                ))}
              </ul>
            </div>

            <p>
              Project Total Price: $
              {project.projectGrandTotal
                ? Number(project.projectGrandTotal).toFixed(2)
                : "0.00"}
            </p>
            <br />
          </div>
        ))
      ) : (
        <p>No projects available</p>
      )
    ) : (
      <p>Loading...</p>
    )}
  </div>
);

export const ViewProjectsMain = ({ projects, loading }) => {
  function StorePreviousProjectData(project) {
    const PROJECT_EDIT = document.getElementById(`editForm_PID_${project._id}`);

    const getValue = (selector, isCheckbox = false) => {
      const element = PROJECT_EDIT.querySelector(selector);
      if (!element) return isCheckbox ? false : "";
      return isCheckbox ? element.checked : element.value;
    };

    const formData = {
      projectName: getValue('input[name="projectName"]'),
      domainName: getValue('input[name="domainName"]'),
      creationDate: getValue('input[name="creationDate"]'),
      packageType: getValue('select[name="packageType"]'),
      isHosting: getValue('input[name="isHosting"]', true),
      hostingPrice: getValue('input[name="hostingPrice"]'),
      renewalDay: getValue('input[name="renewalDay"]'),
      websiteType: getValue('select[name="websiteType"]'),
      additionalAddOns: Array.from(
        PROJECT_EDIT.querySelectorAll('input[name="additionalAddOns"]:checked')
      ).map((el) => el.value),
      additionalPages: getValue('input[name="additionalPages"]'),
      isCustomPrice: getValue('input[name="isCustomPrice"]', true),
      customPrice: getValue('input[name="customPrice"]'),
      projectID: project.projectID, // Assuming project.projectID holds the current project ID
      projectNameID: null,
    };

    // Extract project comments and notes dynamically
    const projectCommentsNotes = [];
    const commentsInputs = PROJECT_EDIT.querySelectorAll(
      ".project-comment-input"
    );
    commentsInputs.forEach((input) => {
      projectCommentsNotes.push(input.value);
    });
    formData.projectCommentsNotes = projectCommentsNotes;

    localStorage.setItem("Previous Project Data", JSON.stringify(formData));
  }

  return (
    <section id="viewProjectsMain" className={`${styles.view_projects_main}`}>
      {/** <TEST_COMPONENT projects={projects} loading={loading} /> */}

      {!loading ? (
        <div className={`${styles.view_projects_main_inner}`}>
          <div
            className={`${styles.view_projects_main_inner_box} container-fluid`}
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <div className={`${styles.project} row`}>
                  <div
                    className={`${styles.project_side} ${styles.project_L} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
                  >
                    <div className={`${styles.project_side_cnt}`}>
                      <span
                        className={`${styles.project_name} orientation-change-element half-second`}
                      >
                        {project.projectName}
                      </span>
                      <span
                        onClick={() => {
                          const URL = project.domainName.startsWith("http")
                            ? project.domainName
                            : `https://${project.domainName}`;
                          window.location.href = URL;
                        }}
                        className={`${styles.domain_name} orientation-change-element half-second`}
                      >
                        {project.domainName}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.project_side} ${styles.project_R} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
                  >
                    <div className={`${styles.project_side_cnt}`}>
                      <button
                        className={`${styles.edit_project_btn} orientation-change-element half-second`}
                        onClick={(e) => {
                          const PROJECT_EDIT = document.getElementById(
                            `editForm_PID_${project._id}`
                          );

                          StorePreviousProjectData(project);

                          document.body.style.overflowY = "hidden";
                          document.body.style.pointerEvents = "none";

                          ManipModalStatus(PROJECT_EDIT, true);

                          console.log(PROJECT_EDIT);
                        }}
                      >
                        <span>
                          Edit
                          <br />
                          <span> </span>Info
                        </span>
                      </button>
                      <button
                        className={`${styles.view_project_btn} orientation-change-element half-second`}
                        onClick={(e) => {
                          const VIEW_PROJECT = document.getElementById(
                            `viewProject_PID_${project._id}`
                          );

                          document.body.style.overflowY = "hidden";
                          document.body.style.pointerEvents = "none";

                          ManipModalStatus(VIEW_PROJECT, true);

                          console.log(VIEW_PROJECT);
                        }}
                      >
                        <span>
                          View
                          <br />
                          <span> </span>Info
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "Open Sans Semi Bold",
                  fontSize: "21px",
                }}
              >
                No Projects Available
              </p>
            )}
          </div>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontFamily: "Open Sans Semi Bold",
            fontSize: "21px",
          }}
        >
          Loading..
        </p>
      )}
    </section>
  );
};
