// Import React, useState, useEffect, and useRouter
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import Nav component
import { Nav } from "@/assets/components/global/All/Nav";

// Import CSS module
import "../assets/styles/modules/ViewProjects/ViewProjects.module.css";

// Function to generate a random project ID
function generateProjectID() {
  return `PID_${Math.random().toString(36).substring(2, 9)}`;
}

// Define component
export default function ViewProjects() {
  // State to manage form data
  const [formData, setFormData] = useState({
    projectName: "",
    domainName: "",
    creationDate: "",
    packageType: "", // Updated to default to an empty string
    isHosting: false,
    hostingPrice: "",
    renewalDay: "",
    websiteType: "",
    additionalAddOns: [],
    additionalPages: "",
    isCustomPrice: false,
    customPrice: "",
    projectGrandTotal: "", // Removed from initial state, will be calculated
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

    // Reset grandTotal when packageType changes
    if (name === "packageType") {
      setFormData((prevData) => ({
        ...prevData,
        projectGrandTotal: "", // Reset grandTotal
      }));
    }

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

      // Update hostingPrice based on selected websiteType and packageType
      let hostingPrice = "";
      if (value === "Shopify") {
        hostingPrice =
          formData.packageType === "Basic" ||
          formData.packageType === "Professional" ||
          formData.packageType === "Enterprise"
            ? "59.99"
            : "";
      } else {
        hostingPrice =
          formData.packageType === "Basic" ||
          formData.packageType === "Professional" ||
          formData.packageType === "Enterprise"
            ? "39.99"
            : "";
      }

      if (
        formData.packageType === "Starter" &&
        (value === "Shopify" || value === "Hand-coded")
      ) {
        // Set websiteType to WordPress if the current websiteType is Shopify or Hand-coded and packageType is Starter
        newWebsiteType = "WordPress";
      }

      if (
        formData.packageType === "Basic" &&
        (value === "Shopify" || value === "Hand-coded")
      ) {
        // Set websiteType to WordPress if the current websiteType is Shopify or Hand-coded and packageType is Basic
        newWebsiteType = "WordPress";
      }

      if (formData.packageType === "Starter") {
        hostingPrice = "29.99";
      }

      setFormData((prevData) => ({
        ...prevData,
        websiteType: newWebsiteType, // Update websiteType
        hostingPrice: hostingPrice,
      }));
    }

    if (name === "isHosting") {
      const newHostingPrice = checked ? "" : null;
      const newRenewalDay = checked ? formData.renewalDay : null;

      setFormData((prevData) => ({
        ...prevData,
        isHosting: checked,
        hostingPrice: newHostingPrice,
        renewalDay: newRenewalDay,
      }));
    } else if (name === "isCustomPrice") {
      const newCustomPrice = checked ? "" : null;

      setFormData((prevData) => ({
        ...prevData,
        isCustomPrice: checked,
        customPrice: newCustomPrice,
        // If isCustomPrice is checked, set customPrice as grandTotal
        // Otherwise, reset customPrice and don't include it in grandTotal
        projectGrandTotal: checked ? value : "",
      }));
    } else if (name === "additionalAddOns") {
      const checkedAddOns = formData.additionalAddOns.includes(value)
        ? formData.additionalAddOns.filter((addon) => addon !== value)
        : [...formData.additionalAddOns, value];

      setFormData((prevData) => ({
        ...prevData,
        additionalAddOns: checkedAddOns,
        // Do not reset additional pages when add-ons change
      }));
    } else if (name === "additionalPages") {
      // Always update additionalPages value regardless of checkbox status
      setFormData((prevData) => ({
        ...prevData,
        additionalPages: value,
      }));
    } else if (name === "packageType") {
      let hostingPrice = "";

      switch (value) {
        case "":
          // Reset form fields when package type changes to default
          setFormData((prevData) => ({
            ...prevData,
            packageType: value,
            projectName: "",
            domainName: "",
            creationDate: "",
            isHosting: false,
            hostingPrice: "",
            renewalDay: "",
            websiteType: "", // Reset websiteType to the first index
            additionalAddOns: [],
            // Do not reset additional pages when package type changes
            isCustomPrice: false,
            customPrice: "",
            projectGrandTotal: "",
            projectCommentsNotes: [""],
            projectNameID: null,
          }));
          break;
        case "Starter":
          hostingPrice = "29.99";
          // Set websiteType to WordPress if the current websiteType is Shopify or Hand-coded
          const newWebsiteType =
            formData.websiteType === "Shopify" ||
            formData.websiteType === "Hand-coded"
              ? "Select a website type"
              : formData.websiteType;
          // Enable Logo Making add-on for Starter package
          setFormData((prevData) => ({
            ...prevData,
            packageType: value,
            hostingPrice: hostingPrice,
            isHosting: true, // Automatically check the hosting checkbox
            additionalAddOns: ["Business Email"], // Enable Logo Making add-on
            websiteType: newWebsiteType, // Update websiteType
            // Do not reset additional pages when selecting Starter package
          }));
          break;
        case "Basic":
          hostingPrice =
            formData.websiteType === "Shopify" ||
            formData.websiteType === "Hand-coded"
              ? "59.99"
              : "39.99";
          setFormData((prevData) => ({
            ...prevData,
            packageType: value,
            hostingPrice: hostingPrice,
            isHosting: true, // Automatically check the hosting checkbox
            additionalAddOns: ["Logo Making", "Business Email"], // Enable Logo Making add-on
            additionalPages: false, // Uncheck additional pages checkbox
            // Reset websiteType to the first index
            websiteType: Object.keys(formData.websiteType)[0],
          }));
          break;
        case "Professional":
          hostingPrice = formData.websiteType === "Shopify" ? "49.99" : "39.99";
          setFormData((prevData) => ({
            ...prevData,
            packageType: value,
            hostingPrice: hostingPrice,
            isHosting: true, // Automatically check the hosting checkbox
            additionalAddOns: ["Logo Making", "Business Email"], // Enable Logo Making add-on
            additionalPages: false, // Uncheck additional pages checkbox
            // Reset websiteType to the first index
            websiteType: Object.keys(formData.websiteType)[0],
          }));
          break;
        case "Enterprise":
          hostingPrice = formData.websiteType === "Shopify" ? "44.99" : "39.99";
          setFormData((prevData) => ({
            ...prevData,
            packageType: value,
            hostingPrice: hostingPrice,
            isHosting: true, // Automatically check the hosting checkbox
            additionalAddOns: ["Logo Making", "Business Email"], // Enable Logo Making add-on
            additionalPages: false, // Uncheck additional pages checkbox
            // Reset websiteType to the first index
            websiteType: Object.keys(formData.websiteType)[0],
          }));
          break;
        default:
          hostingPrice = "";
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

  // Calculate grand total
  const calculateGrandTotal = () => {
    let grandTotal = 0;

    // Add hosting price if applicable
    if (formData.isHosting && formData.hostingPrice) {
      grandTotal += parseFloat(formData.hostingPrice);
    }

    // Add custom price if applicable
    if (formData.isCustomPrice && formData.customPrice) {
      grandTotal += parseFloat(formData.customPrice);
    }

    // Subtract additional pages price if applicable and not setting a custom price
    if (
      formData.additionalPages &&
      !formData.isCustomPrice &&
      formData.additionalAddOns.includes("Additional Pages") &&
      formData.additionalPages !== "" // Ensure additionalPages is not empty
    ) {
      grandTotal += parseFloat(formData.additionalPages) * 149.99;
    }

    // Add additional add-ons price if applicable
    formData.additionalAddOns.forEach((addOn) => {
      switch (addOn) {
        case "Logo Making":
          // Exclude Logo Making price for Basic, Professional, and Enterprise packages
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
          // Do not include additional pages price here
          break;
        default:
          break;
      }
    });

    // Add package price if selected
    if (formData.packageType && packagePrices[formData.packageType]) {
      grandTotal += packagePrices[formData.packageType];
    }

    // Update the projectGrandTotal in the formData state
    setFormData((prevData) => ({
      ...prevData,
      projectGrandTotal: grandTotal.toFixed(2), // Format to two decimal places
    }));
  };

  // useEffect to calculate grand total when form data changes
  useEffect(() => {
    calculateGrandTotal();
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/getProjects", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      alert("Project submitted successfully!");
    } else {
      alert("Failed to submit project.");
    }
  };

  // JSX for the component
  return (
    <div id="PAGE" className="page">
      <div id="PAGE_CNT" className="page-cnt">
        <Nav />
        <form onSubmit={handleSubmit}>
          {/* Package Type dropdown */}
          <select
            name="packageType"
            value={formData.packageType}
            onChange={handleChange}
          >
            <option value="">Select a package</option>
            <option value="Starter">Starter - $499.99</option>
            <option value="Basic">Basic - $999.99</option>
            <option value="Professional">Professional - $1499.99</option>
            <option value="Enterprise">Enterprise - $2499.99</option>
          </select>
          <br />{" "}
          <input
            type="text"
            name="projectID"
            value={formData.projectID}
            readOnly
            placeholder="Project ID"
          />
          <br />
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name"
          />
          <br />
          <input
            type="text"
            name="projectNameID"
            value={formData.projectNameID}
            readOnly
            placeholder="Project Name ID"
          />
          <br />
          <input
            type="text"
            name="domainName"
            value={formData.domainName}
            onChange={handleChange}
            placeholder="Domain Name"
          />
          <br />
          <input
            type="date"
            name="creationDate"
            value={formData.creationDate}
            onChange={handleChange}
            placeholder="Creation Date"
          />
          <br />
          <label>
            Hosting:
            <input
              type="checkbox"
              name="isHosting"
              checked={formData.isHosting}
              onChange={handleChange}
            />
          </label>
          <input
            type="number"
            name="hostingPrice"
            value={formData.hostingPrice}
            onChange={handleChange}
            placeholder="Hosting Price"
            readOnly={!formData.isHosting}
          />
          <br />
          <input
            type="number"
            name="renewalDay"
            value={formData.renewalDay}
            onChange={handleChange}
            placeholder="Renewal Day"
            readOnly={!formData.isHosting}
          />
          <br />
          <select
            name="websiteType"
            value={formData.websiteType}
            onChange={handleChange}
          >
            <option value="0">Select a website type</option>
            <option value="WordPress">WordPress</option>
            <option
              value="Shopify"
              disabled={formData.packageType === "Starter"}
            >
              Shopify
            </option>
            <option
              value="Hand-coded"
              disabled={
                formData.packageType === "Starter" ||
                formData.packageType === "Basic"
              }
            >
              Hand-coded
            </option>
          </select>
          <br />
          Additional Add-Ons:
          <br />
          <label>
            Logo Making ($99.99)
            <input
              type="checkbox"
              name="additionalAddOns"
              value="Logo Making"
              checked={formData.additionalAddOns.includes("Logo Making")}
              onChange={handleChange}
              disabled={
                formData.packageType !== "" &&
                formData.packageType !== "Starter"
              } // Adjusted here
            />
          </label>
          <br />
          <label>
            Business Email (Varies)
            <input
              type="checkbox"
              name="additionalAddOns"
              value="Business Email"
              checked={formData.additionalAddOns.includes("Business Email")}
              onChange={handleChange}
              disabled={
                formData.packageType !== "" || // Disable if any package is selected
                formData.packageType === "Basic" ||
                formData.packageType === "Professional" ||
                formData.packageType === "Enterprise"
              }
            />
          </label>
          <br />
          <label>
            Additional Pages ($149.99)
            <input
              type="checkbox"
              name="additionalAddOns"
              value="Additional Pages"
              checked={formData.additionalAddOns.includes("Additional Pages")}
              onChange={handleChange}
            />
          </label>
          {formData.additionalAddOns.includes("Additional Pages") && (
            <input
              type="number"
              name="additionalPages"
              value={formData.additionalPages}
              onChange={handleChange}
              placeholder="Number of Additional Pages"
            />
          )}
          <br />
          <label>
            Custom Price:
            <input
              type="checkbox"
              name="isCustomPrice"
              checked={formData.isCustomPrice}
              onChange={handleChange}
            />
          </label>
          <input
            type="number"
            name="customPrice"
            value={formData.customPrice}
            readOnly={!formData.isCustomPrice}
            onChange={handleChange}
            placeholder="Custom Price"
          />
          <br />
          <input
            type="text"
            name="projectGrandTotal"
            value={formData.projectGrandTotal}
            onChange={handleChange}
            placeholder="Project Grand Total"
            readOnly
          />
          <br />
          {formData.projectCommentsNotes.map((comment, index) => (
            <input
              key={index}
              type="text"
              value={comment}
              onChange={(e) => handleCommentsChange(index, e.target.value)}
              placeholder={`Comment ${index + 1}`}
            />
          ))}
          <button type="button" onClick={addCommentField}>
            Add Comment
          </button>
          <button type="submit">Submit Project</button>
        </form>
      </div>
    </div>
  );
}
