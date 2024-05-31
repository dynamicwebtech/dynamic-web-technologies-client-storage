// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { Nav } from "@/assets/components/global/All/Nav";
import { TopText } from "@/assets/components/global/All/TopText";

// Style Imports
import styles from "../assets/styles/modules/RemoveProject/RemoveProject.module.css";
import "../assets/styles/modules/RemoveProject/RemoveProject.module.css";
import { RemoveProjectForm } from "@/assets/components/pages/RemoveProject/RemoveProjectForm";

export default function RemoveProject() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/getProjects");
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const PAGE_HEAD_OBJ = {
    pageTitle: "Remove Project(s)",
  };

  const TOP_TEXT_OBJ = {
    hasBottomText: true,
    styles: styles,
    headingText: "Remove Project(s)",
    bottomText:
      "Select the project you would like to remove based on their name and domain name.",
  };

  return (
    <div id="PAGE" className="page">
      <PageHead pageHeadObj={PAGE_HEAD_OBJ} />

      <div id="PAGE_CNT" className="page-cnt">
        <Nav />
        <TopText topTextObj={TOP_TEXT_OBJ} />

        <RemoveProjectForm projects={projects} />
      </div>
    </div>
  );
}
