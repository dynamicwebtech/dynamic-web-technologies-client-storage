/**
 *
 *  This is the Edit Project Form
 *
 */

import React, { useState, useEffect } from "react";

import { FaTimes } from "react-icons/fa";

import ManipModalStatus from "@/assets/functions/dom/manip/ManipModalStatus";

import styles from "../../../styles/modules/ViewProjects/ViewProjects.module.css";

const EditProjectForm = ({ project, onUpdate }) => {
  const [formData, setFormData] = useState({ ...project });
  const [showCustomPrice, setShowCustomPrice] = useState(
    formData.packageType === "Custom"
  );

  // Define package prices
  const packagePrices = {
    Starter: 499.99,
    Basic: 999.99,
    Professional: 1499.99,
    Enterprise: 2499.99,
  };

  useEffect(() => {
    calculateGrandTotal();

    setShowCustomPrice(formData.packageType === "Custom");
  }, [
    formData.packageType,
    formData.isHosting,
    formData.hostingPrice,
    formData.additionalAddOns,
    formData.additionalPages,
    formData.isCustomPrice,
    formData.customPrice,
  ]); // Recalculate grand total whenever formData changes

  const calculateGrandTotal = () => {
    let grandTotal = 0;

    // Add hosting price if applicable
    if (
      formData.isHosting &&
      formData.hostingPrice &&
      !isNaN(parseFloat(formData.hostingPrice))
    ) {
      grandTotal += parseFloat(formData.hostingPrice);
    }

    // Add package price if selected and not "Custom"
    if (
      formData.packageType &&
      formData.packageType !== "Custom" &&
      packagePrices[formData.packageType]
    ) {
      grandTotal += packagePrices[formData.packageType];
    }

    // Add additional pages price if applicable
    if (
      formData.additionalPages &&
      formData.additionalAddOns.includes("Additional Pages") &&
      !isNaN(parseInt(formData.additionalPages))
    ) {
      grandTotal += parseFloat(formData.additionalPages) * 149.99;
    }

    // Add additional add-ons price if applicable
    formData.additionalAddOns.forEach((addOn) => {
      switch (addOn) {
        case "Logo Making":
          if (
            formData.packageType !== "Basic" &&
            formData.packageType !== "Professional" &&
            formData.packageType !== "Enterprise"
          ) {
            grandTotal += 99.99;
          }
          break;
        case "Business Email":
          // Add the price for Business Email here
          // Replace 0 with the actual price
          grandTotal += 0; // Change this line
          break;
        case "Additional Pages":
          break;
        default:
          break;
      }
    });

    // Add custom price if applicable and package type is "Custom"
    if (
      formData.packageType === "Custom" &&
      formData.isCustomPrice &&
      !isNaN(parseFloat(formData.customPrice))
    ) {
      grandTotal += parseFloat(formData.customPrice);
    }

    // Update the grand total in formData
    setFormData((prevData) => ({
      ...prevData,
      projectGrandTotal: grandTotal.toFixed(2),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isHosting") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
        hostingPrice: checked ? prevData.hostingPrice : "",
        renewalDay: checked ? prevData.renewalDay : "",
      }));
    } else if (name === "isCustomPrice") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
        customPrice: checked ? prevData.customPrice : "",
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...(prevData[name] || []), value] // Initialize as an empty array if undefined
          : (prevData[name] || []).filter((item) => item !== value), // Initialize as an empty array if undefined
        additionalPages: prevData.additionalAddOns.includes("Additional Pages")
          ? prevData.additionalPages
          : "",
      }));
    } else {
      // Update projectNameID dynamically
      const projectNameID = value ? "PNID_" + value : "";
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        projectNameID: projectNameID,
        // Clear customPrice if isCustomPrice is unchecked
        customPrice:
          name === "isCustomPrice" && !checked ? "" : prevData.customPrice,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/editProject", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: project._id, ...formData }), // Include projectID in the request body
      });

      const data = await response.json();

      console.log(response);

      if (response.ok) {
        onUpdate({ ...formData, _id: project._id });
        console.log(data.message);
        alert(data.message);
      } else {
        console.error(data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const PRICING_PLANS = [
    {
      planID: "P_1",
      planName: "Starter",
      planDesc:
        "The Starter package is the best option for those who want to gain the most bang for their buck. We will supply you with a 1 page website (either that be WordPress) along with a professional business email!",
      planPrice: 499,
      planHostingPrice: 29.99,
      planIncluded: [
        // "1 Month Free Hosting!",
        "1 Page",
        "WordPress",
        "Responsive Design",
      ],
      hostingIncluded: [
        "10 Annual Revisions",
        "Web Maintenance",
        "Business Email",
        "Reliable Customer Support",
      ],
    },
    {
      planID: "P_2",
      planName: "Basic",
      planDesc:
        "The Basic package will give you the best of both worlds (starter and professional). We will supply you with a 3-page website (either WordPress or Shopify) along with a professionally made logo for your website as well as a business email!",
      planPrice: 999,
      planHostingPrice: 39.99,
      planIncluded: [
        // "1 Month Free Hosting!",
        "3 Pages",
        "WordPress or Shopify",
        "Website Logo",
        "Content Management System",
        "Shopify Option * $59.99/month *",
      ],
      hostingIncluded: [
        "10 Annual Revisions",
        "Web Maintenance",
        "Business Email",
        "Reliable Customer Support",
      ],
    },
    {
      planID: "P_3",
      planName: "Professional",
      planDesc:
        "The Professional package will give your company the best start for its success. We will supply you with a 6-page website (either WordPress or Shopify) along with a logo and business email!",
      planPrice: 1499,
      planHostingPrice: 39.99,
      planIncluded: [
        "6 Pages",
        "WordPress or Shopify",
        "1 Month Free Hosting!",
        "Website Logo",
        "Content Management System",
        //"Content Writing",
        "SEO",
        "Shopify Option * $59.99/month *",
      ],
      hostingIncluded: [
        "10 Annual Revisions",
        "Web Maintenance",
        "Business Email",
        "Reliable Customer Support",
      ],
    },
    {
      planID: "P_4",
      planName: "Enterprise",
      planDesc:
        "The Enterprise package, designed to kickstart your journey to success. Gain access to a dynamic 10-page website, built on either WordPress, Shopify, or meticulously handcrafted coding. Enhance your brand presence with a bespoke logo and dedicated business email. Plus, enjoy the advantage of two months of complimentary hosting!",
      planPrice: 2499 + "+",
      planHostingPrice: 39.99,
      planIncluded: [
        "10 Pages",
        "WordPress, Shopify or Hand-coded",
        "2 Month Free Hosting!",
        "Website Logo",
        "SEO",
        "Content Writing",
        "Content Management System",
        "Shopify Option * $59.99/month *",
      ],
      hostingIncluded: [
        "10 Annual Revisions",
        "Web Maintenance",
        "Business Email",
        "Reliable Customer Support",
      ],
    },
  ];

  function ManipModalStatus_CB() {
    const PROJECT_EDIT = document.getElementById(`editForm_PID_${project._id}`);

    const PROJECT_EDIT_INNER = PROJECT_EDIT.querySelector(".modal-inner");

    PROJECT_EDIT_INNER.scrollTo(0, 0);

    ManipModalStatus(PROJECT_EDIT, false);
  }

  function RestorePreviousProjectData(projectID) {
    const storedData = localStorage.getItem(`Previous Project Data`);
    if (storedData) {
      const formData = JSON.parse(storedData);
      const PROJECT_EDIT = document.getElementById(`editForm_PID_${projectID}`);

      if (PROJECT_EDIT) {
        // Check if original data had isHosting as true
        const originalIsCustomPrice = formData.isCustomPrice;

        // Update the form fields directly
        const projectNameField = PROJECT_EDIT.querySelector(
          'input[name="projectName"]'
        );
        if (projectNameField) {
          projectNameField.value = formData.projectName;
          // Update formData.projectName
          setFormData((prevData) => ({
            ...prevData,
            projectName: formData.projectName,
          }));
        }

        const domainNameField = PROJECT_EDIT.querySelector(
          'input[name="domainName"]'
        );
        if (domainNameField) {
          domainNameField.value = formData.domainName;
          // Update formData.domainName
          setFormData((prevData) => ({
            ...prevData,
            domainName: formData.domainName,
          }));
        }

        const creationDateField = PROJECT_EDIT.querySelector(
          'input[name="creationDate"]'
        );
        if (creationDateField) {
          creationDateField.value = formData.creationDate;
          // Update formData.creationDate
          setFormData((prevData) => ({
            ...prevData,
            creationDate: formData.creationDate,
          }));
        }

        const packageTypeField = PROJECT_EDIT.querySelector(
          'select[name="packageType"]'
        );
        if (packageTypeField) {
          // Find the option with the corresponding text and set selected
          const option = Array.from(packageTypeField.options).find(
            (opt) => opt.text === formData.packageType
          );
          if (option) {
            option.selected = true;
            // Update formData.packageType
            setFormData((prevData) => ({
              ...prevData,
              packageType: formData.packageType,
            }));
          }
        }

        const isHostingField = PROJECT_EDIT.querySelector(
          'input[name="isHosting"]'
        );

        if (isHostingField) {
          isHostingField.checked = formData.isHosting;
          // Update formData.isHosting
          setFormData((prevData) => ({
            ...prevData,
            isHosting: formData.isHosting,
          }));

          // Update hostingPrice and renewalDay immediately after rechecking the checkbox
          setTimeout(() => {
            if (formData.isHosting) {
              const hostingPriceField = PROJECT_EDIT.querySelector(
                'input[name="hostingPrice"]'
              );
              if (hostingPriceField) {
                hostingPriceField.value = formData.hostingPrice;
                // Update formData.hostingPrice
                setFormData((prevData) => ({
                  ...prevData,
                  hostingPrice: formData.hostingPrice,
                }));
              }

              const renewalDayField = PROJECT_EDIT.querySelector(
                'input[name="renewalDay"]'
              );
              if (renewalDayField) {
                renewalDayField.value = formData.renewalDay;
                // Update formData.renewalDay
                setFormData((prevData) => ({
                  ...prevData,
                  renewalDay: formData.renewalDay,
                }));
              }
            }
          }, 400);
        }

        const websiteTypeField = PROJECT_EDIT.querySelector(
          'select[name="websiteType"]'
        );
        if (websiteTypeField) {
          // Find the option with the corresponding text and set selected
          const option = Array.from(websiteTypeField.options).find(
            (opt) => opt.text === formData.websiteType
          );
          if (option) {
            option.selected = true;
            // Update formData.websiteType
            setFormData((prevData) => ({
              ...prevData,
              websiteType: formData.websiteType,
            }));
          }
        }

        // Clear all additionalAddOns checkboxes first
        const additionalAddOnsCheckboxes = PROJECT_EDIT.querySelectorAll(
          'input[name="additionalAddOns"]'
        );
        additionalAddOnsCheckboxes.forEach((checkbox) => {
          checkbox.checked = formData.additionalAddOns.includes(checkbox.value);
        });

        // Update formData.additionalAddOns
        const checkedAddOns = Array.from(additionalAddOnsCheckboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
        setFormData((prevData) => ({
          ...prevData,
          additionalAddOns: checkedAddOns,
        }));

        const additionalPagesField = PROJECT_EDIT.querySelector(
          'input[name="additionalPages"]'
        );
        if (additionalPagesField)
          additionalPagesField.value = formData.additionalPages;

        const isCustomPriceField = PROJECT_EDIT.querySelector(
          'input[name="isCustomPrice"]'
        );
        if (isCustomPriceField) {
          isCustomPriceField.checked = originalIsCustomPrice; // Recheck the checkbox
          // Update formData.isCustomPrice
          setFormData((prevData) => ({
            ...prevData,
            isCustomPrice: originalIsCustomPrice,
          }));

          // Update customPrice immediately after rechecking the checkbox
          setTimeout(() => {
            // Capture isCustomPriceField in a closure
            const isCustomPriceChecked = isCustomPriceField.checked;
            if (isCustomPriceChecked) {
              const customPriceField = PROJECT_EDIT.querySelector(
                'input[name="customPrice"]'
              );
              if (customPriceField) {
                customPriceField.value = formData.customPrice;
                // Update formData.customPrice
                setFormData((prevData) => ({
                  ...prevData,
                  customPrice: formData.customPrice,
                }));
              }
            }
          }, 400);
        }

        // Reset isCustomPrice if packageType is not "Custom"
        const packageType = formData.packageType;
        if (packageType !== "Custom") {
          // Get the original isCustomPrice value
          if (isCustomPriceField) {
            // Update the isCustomPrice field
            isCustomPriceField.checked = false;
            // Update formData.isCustomPrice
            setFormData((prevData) => ({
              ...prevData,
              isCustomPrice: false,
            }));
          }
        }

        // const customPriceField = PROJECT_EDIT.querySelector(
        //   'input[name="customPrice"]'
        // );
        // if (customPriceField) {
        //   customPriceField.value = formData.customPrice; // Update the custom price field with the stored value
        //   // Update formData.customPrice
        //   setFormData((prevData) => ({
        //     ...prevData,
        //     customPrice: formData.customPrice,
        //   }));
        // }

        // Update formData.projectCommentsNotes
        setFormData((prevData) => ({
          ...prevData,
          projectCommentsNotes: formData.projectCommentsNotes,
        }));

        console.log("Form data restored");
        console.log(formData);

        alert("Project Data was RESTORED!");
      } else {
        console.error(`Element with ID editForm_PID_${projectID} not found.`);
      }
    } else {
      console.log("No previous data found in localStorage");
    }
  }

  return (
    <div
      className={`${styles.edit_project}`}
      id={`editForm_PID_${project._id}`}
    >
      <div
        className={`${styles.darken}`}
        onClick={() => {
          ManipModalStatus_CB();
        }}
      />

      <div className={`${styles.edit_project_inner} modal-inner`}>
        <div className={`${styles.edit_project_inner_top}`}>
          <span className={`${styles.modal_name}`}>Edit Project</span>

          <button
            className="half-second"
            onClick={() => {
              ManipModalStatus_CB();
            }}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`${styles.form_set} ${styles.single_input}`}>
            <label htmlFor="_id">Project ID:</label>
            <input
              type="text"
              id="_id"
              name="_id"
              value={formData._id}
              // onChange={handleChange}
              disabled
            />
          </div>
          <div className={`${styles.form_set} ${styles.single_input}`}>
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.form_set} ${styles.single_input}`}>
            <label htmlFor="domainName">Domain Name:</label>
            <input
              type="text"
              id="domainName"
              name="domainName"
              value={formData.domainName}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.form_set} ${styles.single_input}`}>
            <label htmlFor="creationDate">Creation Date:</label>
            <input
              type="date"
              id="creationDate"
              name="creationDate"
              value={formData.creationDate}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.form_set} ${styles.single_input}`}>
            <label htmlFor="packageType">Package Type:</label>
            <select
              id="packageType"
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
            >
              <option value="">Select Package Type</option>
              <option value="Starter">Starter</option>
              <option value="Basic">Basic</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div className={`${styles.hosting_stuff}`}>
            <div className={`${styles.form_set} ${styles.main_cb_set}`}>
              <label>
                Are We Hosting?
                <input
                  type="checkbox"
                  name="isHosting"
                  checked={formData.isHosting}
                  onChange={handleChange}
                />
              </label>
            </div>
            {formData.isHosting && (
              <div className={`${styles.form_set} ${styles.hosting_set}`}>
                <label htmlFor="hostingPrice">Hosting Price (Monthly):</label>
                <input
                  type="text"
                  id="hostingPrice"
                  name="hostingPrice"
                  value={formData.hostingPrice}
                  onChange={handleChange}
                />
              </div>
            )}
            {formData.isHosting && (
              <div className={`${styles.form_set} ${styles.hosting_set}`}>
                <label htmlFor="renewalDay">Renewal Day:</label>
                <input
                  type="text"
                  id="renewalDay"
                  name="renewalDay"
                  value={formData.renewalDay}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
          <div className={`${styles.form_set} ${styles.single_input}`}>
            <label htmlFor="websiteType">Website Type:</label>
            <select
              id="websiteType"
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
            >
              <option value="">Select Website Type</option>
              <option value="WordPress">WordPress</option>
              <option value="Shopify">Shopify</option>
              <option value="Hand-coded">Hand-coded</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className={`${styles.form_set} ${styles.add_ons_set}`}>
            <label htmlFor="additionalAddOns">Additional Add-Ons:</label>
            <div>
              <label className={`${styles.add_on}`}>
                <input
                  type="checkbox"
                  name="additionalAddOns"
                  value="Logo Making"
                  checked={formData.additionalAddOns.includes("Logo Making")}
                  onChange={handleChange}
                />
                Logo Making
              </label>
              {/* Add other checkboxes similarly */}
              <label className={`${styles.add_on}`}>
                <input
                  type="checkbox"
                  name="additionalAddOns"
                  value="Business Email"
                  checked={formData.additionalAddOns.includes("Business Email")}
                  onChange={handleChange}
                />
                Business Email
              </label>
              <label className={`${styles.add_on}`}>
                <input
                  type="checkbox"
                  name="additionalAddOns"
                  value="Additional Pages"
                  checked={formData.additionalAddOns.includes(
                    "Additional Pages"
                  )}
                  onChange={handleChange}
                />
                Additional Pages
              </label>
              {/* Add other checkboxes similarly */}
              {formData.additionalAddOns.includes("Additional Pages") && (
                <div className={`${styles.additional_pages_set}`}>
                  <label htmlFor="additionalPages">
                    Number of Additional Pages:
                  </label>
                  <input
                    type="number"
                    id="additionalPages"
                    name="additionalPages"
                    value={formData.additionalPages}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              )}
              <label className={`${styles.add_on}`}>
                <input
                  type="checkbox"
                  name="additionalAddOns"
                  value="SEO"
                  checked={formData.additionalAddOns.includes("SEO")}
                  onChange={handleChange}
                />
                SEO
              </label>
              <label className={`${styles.add_on}`}>
                <input
                  type="checkbox"
                  name="additionalAddOns"
                  value="Content Writing"
                  checked={formData.additionalAddOns.includes(
                    "Content Writing"
                  )}
                  onChange={handleChange}
                />
                Content Writing
              </label>
            </div>

            {/* Add other checkboxes similarly */}
          </div>

          {showCustomPrice && (
            <div className={`${styles.custom_price_stuff}`}>
              {showCustomPrice && (
                <div className={`${styles.form_set} ${styles.main_cb_set}`}>
                  <label>
                    Set Custom Price?
                    <input
                      type="checkbox"
                      name="isCustomPrice"
                      checked={formData.isCustomPrice}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              )}
              {formData.isCustomPrice && showCustomPrice && (
                <div
                  className={`${styles.form_set} ${styles.custom_price_set}`}
                >
                  <label htmlFor="customPrice">Custom Price Amount:</label>
                  <input
                    type="text"
                    id="customPrice"
                    name="customPrice"
                    value={formData.customPrice}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          )}

          <div className={`${styles.form_set} ${styles.comments_notes_set}`}>
            <label htmlFor="projectCommentsNotes">
              Project Comments/Notes:
            </label>
            <ul>
              {formData.projectCommentsNotes.map((comment, index) => (
                <li key={index}>
                  {" "}
                  <input
                    type="text"
                    className="project-comment-input"
                    value={comment}
                    onChange={(e) => {
                      const comments = [...formData.projectCommentsNotes];
                      comments[index] = e.target.value;
                      setFormData({
                        ...formData,
                        projectCommentsNotes: comments,
                      });
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.form_set} ${styles.grand_total_set}`}>
            <label>Project Grand Total:</label>
            <p>${formData.projectGrandTotal}</p>
          </div>

          <div className={`${styles.form_btns}`}>
            <button
              className={`${styles.restore_btn}`}
              onClick={(e) => {
                e.preventDefault();

                RestorePreviousProjectData(project._id);
              }}
            >
              Restore Original
            </button>
            <button type={"submit"} className={`${styles.submit_btn}`}>
              Confirm Change(s)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectForm;
