import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { FaInfo, FaTimes } from "react-icons/fa";

import styles from "../../../styles/modules/AddProject/AddProject.module.css";

// Function to generate a random project ID
function generateProjectID() {
  return `PID_${Math.random().toString(36).substring(2, 9)}`;
}

export const AddProjectForm = () => {
  const [packageSelected, setPackageSelected] = useState(false);
  const [packageInfoOpen, setPackageInfoOpen] = useState(false);
  const [starterSelected, setStarterSelected] = useState(false);
  const [basicSelected, setBasicSelected] = useState(false);
  const [professionalSelected, setProfessionalSelected] = useState(false);
  const [enterpriseSelected, setEnterpriseSelected] = useState(false);
  const [customSelected, setCustomSelected] = useState(false);

  // State to manage form data
  const [formData, setFormData] = useState({
    projectName: "",
    domainName: "",
    creationDate: "",
    packageType: "",
    isHosting: false,
    hostingPrice: "",
    renewalDay: "",
    websiteType: "",
    additionalAddOns: [],
    additionalPages: "",
    isCustomPrice: false,
    customPrice: "",
    projectGrandTotal: "",
    projectCommentsNotes: [""],
    projectID: null,
    projectNameID: null,
  });

  // Define package prices
  const packagePrices = {
    Starter: 499.99,
    Basic: 999.99,
    Professional: 1499.99,
    Enterprise: 2499.99,
  };

  // useEffect to generate projectID when component mounts
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      projectID: generateProjectID(),
    }));
  }, []);

  // Router instance
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const getHostingPrice = (packageType, websiteType) => {
      let hostingPrice = "";
      if (packageType === "Starter") {
        hostingPrice = "29.99";
      } else if (packageType === "Basic") {
        hostingPrice = websiteType === "Shopify" ? "59.99" : "39.99";
      } else if (packageType === "Professional") {
        hostingPrice = websiteType === "Shopify" ? "59.99" : "39.99";
      } else if (packageType === "Enterprise") {
        hostingPrice = websiteType === "Shopify" ? "59.99" : "39.99";
      }

      return hostingPrice;
    };

    if (name === "projectName") {
      setFormData((prevData) => ({
        ...prevData,
        projectNameID: `PNID_${value}`,
      }));
    }

    if (name === "additionalPages" && value < 0) {
      // Prevent negative additional pages
      setFormData((prevData) => ({ ...prevData, additionalPages: "" }));
      return;
    }

    if (name === "websiteType") {
      let newWebsiteType = value;
      let hostingPrice = getHostingPrice(formData.packageType, value);

      if (
        formData.packageType === "Starter" &&
        (value === "Shopify" || value === "Hand-coded")
      ) {
        newWebsiteType = "WordPress";
      } else if (
        formData.packageType === "Basic" &&
        !["Shopify", "WordPress", "Select Website Type"].includes(value)
      ) {
        newWebsiteType = "WordPress";
      } else if (formData.packageType === "Professional") {
        hostingPrice = value === "Shopify" ? "59.99" : "39.99";
      } else if (formData.packageType === "Enterprise") {
        hostingPrice = value === "Shopify" ? "59.99" : "39.99";
      }

      setFormData((prevData) => ({
        ...prevData,
        websiteType: newWebsiteType,
        hostingPrice: hostingPrice,
      }));
    } else if (name === "isHosting") {
      const newHostingPrice = checked
        ? getHostingPrice(formData.packageType, formData.websiteType)
        : "";
      const newRenewalDay = checked ? formData.renewalDay : "";

      setFormData((prevData) => ({
        ...prevData,
        isHosting: checked,
        hostingPrice: newHostingPrice,
        renewalDay: newRenewalDay,
      }));
    } else if (name === "isCustomPrice") {
      const newCustomPrice = checked ? formData.customPrice : "";

      setFormData((prevData) => ({
        ...prevData,
        isCustomPrice: checked,
        customPrice: newCustomPrice,
        projectGrandTotal: checked
          ? newCustomPrice
          : formData.projectGrandTotal,
      }));
    } else if (name === "additionalAddOns") {
      const checkedAddOns = formData.additionalAddOns.includes(value)
        ? formData.additionalAddOns.filter((addon) => addon !== value)
        : [...formData.additionalAddOns, value];

      setFormData((prevData) => ({
        ...prevData,
        additionalAddOns: checkedAddOns,
      }));
    } else if (name === "additionalPages") {
      setFormData((prevData) => ({
        ...prevData,
        additionalPages: value,
      }));
    } else if (name === "packageType") {
      let hostingPrice = getHostingPrice(value, formData.websiteType);

      if (value === "Starter") {
        hostingPrice = "29.99";
        const newWebsiteType =
          formData.websiteType === "Shopify" ||
          formData.websiteType === "Hand-coded"
            ? "Select a website type"
            : formData.websiteType;
        setFormData((prevData) => ({
          ...prevData,
          packageType: value,
          hostingPrice: hostingPrice,
          isHosting: true,
          additionalAddOns: ["Business Email"],
          websiteType: newWebsiteType,
        }));
      } else if (value === "Basic") {
        hostingPrice = formData.websiteType === "Shopify" ? "59.99" : "39.99";

        setFormData((prevData) => ({
          ...prevData,
          packageType: value,
          hostingPrice: hostingPrice,
          isHosting: true,
          additionalAddOns: ["Logo Making", "Business Email"],
          additionalPages: "",
        }));
      } else if (value === "Professional") {
        hostingPrice = formData.websiteType === "Shopify" ? "59.99" : "39.99";
        setFormData((prevData) => ({
          ...prevData,
          packageType: value,
          hostingPrice: hostingPrice,
          isHosting: true,
          additionalAddOns: ["Logo Making", "Business Email", "SEO"],
          additionalPages: "",
        }));
      } else if (value === "Enterprise") {
        hostingPrice = formData.websiteType === "Shopify" ? "59.99" : "39.99";
        setFormData((prevData) => ({
          ...prevData,
          packageType: value,
          hostingPrice: hostingPrice,
          isHosting: true,
          additionalAddOns: [
            "Logo Making",
            "Business Email",
            "SEO",
            "Content Writing",
          ],
          additionalPages: "",
        }));
      } else if (value === "Custom") {
        setFormData((prevData) => ({
          ...prevData,
          packageType: value,
          isHosting: true, // Clear hosting
          hostingPrice: "", // Clear hosting price
          additionalAddOns: [
            "Logo Making",
            "Business Email",
            "Additional Pages",
            "SEO",
            "Content Writing",
          ],
          websiteType: "",
        }));
        return;
      } else {
        setFormData((prevData) => ({
          ...prevData,
          packageType: value,
          projectName: "",
          domainName: "",
          creationDate: "",
          isHosting: false,
          hostingPrice: "",
          renewalDay: "",
          websiteType: "",
          additionalAddOns: [],
          isCustomPrice: false,
          customPrice: "",
          projectGrandTotal: "",
          projectCommentsNotes: [""],
          projectNameID: null,
        }));
        return;
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle comments change
  const handleCommentsChange = (index, value) => {
    const newComments = formData.projectCommentsNotes.map((comment, i) =>
      i === index ? value : comment
    );
    setFormData((prevData) => ({
      ...prevData,
      projectCommentsNotes: newComments,
    }));
  };

  // Add comment field
  const addCommentField = () => {
    setFormData((prevData) => ({
      ...prevData,
      projectCommentsNotes: [...prevData.projectCommentsNotes, ""],
    }));
  };

  // Remove comment field
  const removeCommentField = (indexToRemove) => {
    const updatedComments = formData.projectCommentsNotes.filter(
      (comment, index) => index !== indexToRemove
    );
    setFormData((prevData) => ({
      ...prevData,
      projectCommentsNotes: updatedComments,
    }));
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    let grandTotal = 0;

    // Add hosting price if applicable
    if (formData.isHosting && formData.hostingPrice) {
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
      formData.additionalPages !== ""
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
      formData.customPrice
    ) {
      grandTotal += parseFloat(formData.customPrice);
    }

    // Update the grand total in formData
    setFormData((prevData) => ({
      ...prevData,
      projectGrandTotal: grandTotal.toFixed(2),
    }));
  };

  // useEffect to calculate grand total whenever dependencies change
  useEffect(() => {
    calculateGrandTotal();
  }, [
    formData.packageType,
    formData.isHosting,
    formData.hostingPrice,
    formData.additionalAddOns,
    formData.additionalPages,
    formData.isCustomPrice,
    formData.customPrice,
  ]);

  const resetForm = () => {
    setPackageSelected(false);
    setPackageInfoOpen(false);

    setStarterSelected(false);
    setBasicSelected(false);
    setProfessionalSelected(false);
    setEnterpriseSelected(false);
    setCustomSelected(false);

    setFormData({
      projectName: "",
      domainName: "",
      creationDate: "",
      packageType: "",
      isHosting: false,
      hostingPrice: "",
      renewalDay: "",
      websiteType: "",
      additionalAddOns: [],
      additionalPages: "",
      isCustomPrice: false,
      customPrice: "",
      projectGrandTotal: "",
      projectCommentsNotes: [""],
      projectID: generateProjectID(),
      projectNameID: null,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/postProjects", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      resetForm();

      let userResponse = prompt(
        "Project submitted successfully! Would you like to view this project? (Enter 'Y', 'Yes' OR 'N', 'No')"
      );

      if (userResponse !== null) {
        userResponse = userResponse.trim().toLowerCase();

        if (userResponse === "y" || userResponse === "yes") {
          window.location.href = "/view_projects";
        } else if (userResponse === "n" || userResponse === "no") {
          alert("Project submitted successfully!");
        } else {
          // Invalid input handling
          alert("Invalid input. Please enter 'Y', 'Yes', 'N', or 'No'.");
        }
      }
    } else if (response.status === 409) {
      alert(
        "A project with the same name and domain already exists in the database."
      );
    } else {
      alert("Failed to submit project.");
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

  return (
    <div className={styles.add_project_form}>
      <div className={styles.add_project_form_inner}>
        <span
          className={`${styles.required_text} orientation-change-element half-second`}
        >
          <span style={{ color: "red" }}>*</span> = Required
        </span>

        <form onSubmit={handleSubmit} onReset={resetForm}>
          {/* Form fields for project details */}

          <div className={`${styles.form_divider}`} />

          <div className={styles.form_group}>
            <label htmlFor="projectName">
              <span>
                <span style={{ color: "red" }}>*</span> Project Name:{" "}
              </span>
            </label>
            <input
              className={`${styles.text_input}`}
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="domainName">
              <span>
                <span style={{ color: "red" }}>*</span> Domain Name:
              </span>
            </label>
            <input
              className={`${styles.text_input}`}
              type="text"
              id="domainName"
              name="domainName"
              value={formData.domainName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="creationDate">
              <span>
                <span style={{ color: "red" }}>*</span> Creation Date:
              </span>
            </label>
            <input
              className={`${styles.date_input}`}
              type="date"
              id="creationDate"
              name="creationDate"
              value={formData.creationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles.form_divider}`} />

          <div className={`${styles.form_group} ${styles.package_type}`}>
            {packageSelected && !packageInfoOpen ? (
              <button
                className={`${styles.info_btn} ${styles.info_btn_open}`}
                onClick={(e) => {
                  e.preventDefault();

                  const PACKAGE_INFO_POPUP =
                    document.getElementById("packageInfoPopup");

                  PACKAGE_INFO_POPUP.style.display = "block";

                  setPackageInfoOpen(true);
                }}
              >
                <FaInfo />
              </button>
            ) : null}

            {packageSelected && packageInfoOpen ? (
              <button
                className={`${styles.info_btn} ${styles.info_btn_open}`}
                onClick={(e) => {
                  e.preventDefault();

                  const PACKAGE_INFO_POPUP =
                    document.getElementById("packageInfoPopup");

                  PACKAGE_INFO_POPUP.style.display = "none";

                  setPackageInfoOpen(false);
                }}
              >
                <FaTimes />
              </button>
            ) : null}
            <div className={`${styles.form_group_inner}`}>
              <label htmlFor="packageType">
                <span style={{ color: "red" }}>*</span> Package Type
              </label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={(e) => {
                  handleChange(e);

                  if (
                    e.currentTarget.selectedIndex === 1 ||
                    e.currentTarget.selectedIndex === 2 ||
                    e.currentTarget.selectedIndex === 3 ||
                    e.currentTarget.selectedIndex === 4
                  ) {
                    setPackageSelected(true);
                    setCustomSelected(false);

                    if (e.currentTarget.selectedIndex === 1) {
                      setStarterSelected(true);
                    } else {
                      setStarterSelected(false);
                    }

                    if (e.currentTarget.selectedIndex === 2) {
                      setBasicSelected(true);
                    } else {
                      setBasicSelected(false);
                    }

                    if (e.currentTarget.selectedIndex === 3) {
                      setProfessionalSelected(true);
                    } else {
                      setProfessionalSelected(false);
                    }

                    if (e.currentTarget.selectedIndex === 4) {
                      setEnterpriseSelected(true);
                    } else {
                      setEnterpriseSelected(false);
                    }
                  } else {
                    setPackageSelected(false);
                    setPackageInfoOpen(false);
                  }

                  if (e.currentTarget.selectedIndex === 5) {
                    setCustomSelected(true);
                  }
                }}
                required
              >
                <option value="">Select Package Type</option>
                <option value="Starter">Starter</option>
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>

          {packageSelected ? (
            <div
              id="packageInfoPopup"
              className={`${styles.package_type_popup}`}
              style={{ display: "none" }}
            >
              {starterSelected ? (
                <div className={`${styles.package_type_popup_inner}`}>
                  <div className={`${styles.package_type_popup_inner_cnt}`}>
                    <div className={`${styles.package_price}`}>
                      Package Price - ${PRICING_PLANS[0].planPrice}
                    </div>

                    <span className={`${styles.included_heading}`}>
                      Included in Plan:
                    </span>
                    <ul className={`${styles.plan_included}`}>
                      {PRICING_PLANS[0].planIncluded.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>

                    <div className={`${styles.hosting_price}`}>
                      Hosting Price - ${PRICING_PLANS[0].planHostingPrice}
                      /month
                    </div>

                    <span className={`${styles.included_heading}`}>
                      Included in Hosting:
                    </span>
                    <ul className={`${styles.hosting_included}`}>
                      {PRICING_PLANS[0].hostingIncluded.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {basicSelected ? (
                <div className={`${styles.package_type_popup_inner}`}>
                  <div className={`${styles.package_type_popup_inner}`}>
                    <div className={`${styles.package_type_popup_inner_cnt}`}>
                      <span className={`${styles.package_price}`}>
                        Package Price - ${PRICING_PLANS[1].planPrice}
                      </span>

                      <span className={`${styles.included_heading}`}>
                        Included in Plan:
                      </span>
                      <ul className={`${styles.plan_included}`}>
                        {PRICING_PLANS[1].planIncluded.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>

                      <div className={`${styles.hosting_price}`}>
                        Hosting Price - ${PRICING_PLANS[1].planHostingPrice}
                        /month
                      </div>

                      <span className={`${styles.included_heading}`}>
                        Included in Hosting:
                      </span>
                      <ul className={`${styles.hosting_included}`}>
                        {PRICING_PLANS[1].hostingIncluded.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {professionalSelected ? (
                <div className={`${styles.package_type_popup_inner}`}>
                  <div className={`${styles.package_type_popup_inner_cnt}`}>
                    <div className={`${styles.package_price}`}>
                      Package Price - ${PRICING_PLANS[2].planPrice}
                    </div>

                    <span className={`${styles.included_heading}`}>
                      Included in Plan:
                    </span>
                    <ul className={`${styles.plan_included}`}>
                      {PRICING_PLANS[2].planIncluded.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>

                    <div className={`${styles.hosting_price}`}>
                      Hosting Price - ${PRICING_PLANS[2].planHostingPrice}
                      /month
                    </div>

                    <span className={`${styles.included_heading}`}>
                      Included in Hosting:
                    </span>
                    <ul className={`${styles.hosting_included}`}>
                      {PRICING_PLANS[2].hostingIncluded.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              {enterpriseSelected ? (
                <div className={`${styles.package_type_popup_inner}`}>
                  <div className={`${styles.package_type_popup_inner}`}>
                    <div className={`${styles.package_type_popup_inner_cnt}`}>
                      <div className={`${styles.package_price}`}>
                        Package Price - ${PRICING_PLANS[3].planPrice}
                      </div>

                      <span className={`${styles.included_heading}`}>
                        Included in Plan:
                      </span>
                      <ul className={`${styles.plan_included}`}>
                        {PRICING_PLANS[3].planIncluded.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>

                      <div className={`${styles.hosting_price}`}>
                        Hosting Price - ${PRICING_PLANS[3].planHostingPrice}
                        /month
                      </div>

                      <span className={`${styles.included_heading}`}>
                        Included in Hosting:
                      </span>
                      <ul className={`${styles.hosting_included}`}>
                        {PRICING_PLANS[3].hostingIncluded.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className={styles.form_group}>
            <label htmlFor="websiteType">
              <span style={{ color: "red" }}>*</span> Website Type
            </label>
            <select
              id="websiteType"
              name="websiteType"
              value={formData.websiteType}
              onChange={handleChange}
              required
            >
              <option value="">Select Website Type</option>
              <option value="WordPress">WordPress</option>
              <option value="Shopify">Shopify</option>
              <option value="Hand-coded">Hand-coded</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className={styles.form_group}>
            <label
              className={`${styles.cb_holder} ${styles.is_hosting}`}
              htmlFor="isHosting"
            >
              Are We Hosting?
              <input
                className={`${styles.input_cb}`}
                type="checkbox"
                id="isHosting"
                name="isHosting"
                checked={formData.isHosting}
                onChange={handleChange}
              />
            </label>
          </div>
          {formData.isHosting && (
            <div className={`${styles.form_group} ${styles.hosting_group}`}>
              <label htmlFor="hostingPrice">
                <span>Hosting Price (Monthly):</span>
              </label>
              <input
                type="text"
                id="hostingPrice"
                name="hostingPrice"
                value={formData.hostingPrice}
                onChange={handleChange}
                disabled={!formData.isHosting}
              />
            </div>
          )}
          {formData.isHosting && (
            <div className={`${styles.form_group} ${styles.hosting_group}`}>
              <label htmlFor="renewalDay">
                <span>Renewal Day:</span>
              </label>
              <input
                type="text"
                id="renewalDay"
                name="renewalDay"
                value={formData.renewalDay}
                onChange={handleChange}
                disabled={!formData.isHosting}
              />
            </div>
          )}
          <div className={styles.form_group}>
            <label htmlFor="additionalAddOns">Additional Add-Ons</label>
            <div className={styles.form_cb_group}>
              <label className={`${styles.cb_holder}`}>
                <input
                  className={`${styles.input_cb}`}
                  type="checkbox"
                  name="additionalAddOns"
                  value="Logo Making"
                  checked={formData.additionalAddOns.includes("Logo Making")}
                  onChange={handleChange}
                />
                <span className={`${styles.cb_name}`}>Logo Making</span>
              </label>
              <label className={`${styles.cb_holder}`}>
                <input
                  className={`${styles.input_cb}`}
                  type="checkbox"
                  name="additionalAddOns"
                  value="Business Email"
                  checked={formData.additionalAddOns.includes("Business Email")}
                  onChange={handleChange}
                />
                <span className={`${styles.cb_name}`}>Business Email</span>
              </label>
              <label className={`${styles.cb_holder}`}>
                <input
                  className={`${styles.input_cb}`}
                  type="checkbox"
                  name="additionalAddOns"
                  value="Additional Pages"
                  checked={formData.additionalAddOns.includes(
                    "Additional Pages"
                  )}
                  onChange={handleChange}
                />
                <span className={`${styles.cb_name}`}>Additional Pages</span>
              </label>

              {formData.additionalAddOns.includes("Additional Pages") && (
                <div
                  className={`${styles.form_group} ${styles.additional_pages_group} ${styles.mobilePadding}`}
                >
                  <label htmlFor="additionalPages">
                    <span>Number of Additional Pages:</span>
                    <input
                      type="number"
                      id="additionalPages"
                      name="additionalPages"
                      value={formData.additionalPages}
                      onChange={handleChange}
                      min="0"
                    />
                  </label>
                </div>
              )}

              <label className={`${styles.cb_holder}`}>
                <input
                  className={`${styles.input_cb}`}
                  type="checkbox"
                  name="additionalAddOns"
                  value="SEO"
                  checked={formData.additionalAddOns.includes("SEO")}
                  onChange={handleChange}
                />
                <span className={`${styles.cb_name}`}>SEO</span>
              </label>
              <label className={`${styles.cb_holder}`}>
                <input
                  className={`${styles.input_cb}`}
                  type="checkbox"
                  name="additionalAddOns"
                  value="Content Writing"
                  checked={formData.additionalAddOns.includes(
                    "Content Writing"
                  )}
                  onChange={handleChange}
                />
                <span className={`${styles.cb_name}`}>Content Writing</span>
              </label>
            </div>
          </div>
          {customSelected ? (
            <div className={styles.form_group}>
              <label
                className={`${styles.cb_holder} ${styles.is_custom_price}`}
                htmlFor="isHosting"
              >
                Set Custom Price?
                <input
                  className={`${styles.input_cb}`}
                  type="checkbox"
                  id="isCustomPrice"
                  name="isCustomPrice"
                  checked={formData.isCustomPrice}
                  onChange={handleChange}
                />
              </label>
            </div>
          ) : null}

          <div className={`${styles.form_group} ${styles.custom_price_group}`}>
            {customSelected && formData.isCustomPrice && (
              <label htmlFor="customPrice">
                <span>Custom Price Amount:</span>
                <input
                  type="text"
                  id="customPrice"
                  name="customPrice"
                  value={formData.customPrice}
                  onChange={handleChange}
                  readOnly={!formData.isCustomPrice}
                />
              </label>
            )}
          </div>

          <div className={styles.form_group}>
            <label htmlFor="projectCommentsNotes">Project Comments/Notes</label>
            {formData.projectCommentsNotes.map((comment, index) => (
              <div key={index} className={styles.comment_container}>
                {/* Display comment number */}
                <span className={styles.commentNumber}>{index + 1}.</span>
                {/* Input field for comment */}
                <input
                  type="text"
                  value={comment}
                  // Handle onChange event to update comments
                  onChange={(e) => handleCommentsChange(index, e.target.value)}
                />

                <button
                  type="button"
                  className={styles.remove_comment}
                  onClick={() => removeCommentField(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <br />
            <button
              type="button"
              className={`${styles.add_comment}`}
              onClick={addCommentField}
            >
              Add Another Comment/Note
            </button>
          </div>

          <div className={`${styles.form_divider}`} />

          <div className={`${styles.form_group} ${styles.grand_total}`}>
            <label>
              <span>Project Grand Total:</span>
              <p>$ {formData.projectGrandTotal}</p>
            </label>
          </div>

          <div className={styles.form_btns}>
            <button
              type={"reset"}
              className={`${styles.reset_btn} orientation-change-element half-second`}
            >
              CLEAR
            </button>
            <button
              type={"submit"}
              className={`${styles.add_btn} orientation-change-element half-second`}
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
