// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { Nav } from "@/assets/components/global/All/Nav";
import { TopText } from "@/assets/components/global/All/TopText";
import { AddProjectForm } from "@/assets/components/pages/AddProject/AddProjectForm";

// Style Imports
import "../assets/styles/modules/AddProject/AddProject.module.css";
import styles from "../assets/styles/modules/AddProject/AddProject.module.css";

export default function AddProject() {
  const router = useRouter();

  const PAGE_HEAD_OBJ = {
    pageTitle: "Add Project(s)",
  };

  const TOP_TEXT_OBJ = {
    hasBottomText: true,
    styles: styles,
    headingText: "Add A Project",
    bottomText:
      "Enter in all of the essential information for the project you would like to add to the database.",
  };

  return (
    <div id="PAGE" className="page">
      <PageHead pageHeadObj={PAGE_HEAD_OBJ} />

      <div id="PAGE_CNT" className="page-cnt">
        <Nav />

        <TopText topTextObj={TOP_TEXT_OBJ} />
        <AddProjectForm />
      </div>
    </div>
  );
}
