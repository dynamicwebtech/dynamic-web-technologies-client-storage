// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { Nav } from "@/assets/components/global/All/Nav";
import { TopText } from "@/assets/components/global/All/TopText";
import { ViewProjectsMain } from "@/assets/components/pages/ViewProjects/ViewProjectsMain";
import EditProjectForm from "@/assets/components/pages/ViewProjects/EditProjectForm";
import { ViewProject } from "@/assets/components/pages/ViewProjects/ViewProject";

// Style Imports
import "../assets/styles/modules/ViewProjects/ViewProjects.module.css";
import styles from "../assets/styles/modules/ViewProjects/ViewProjects.module.css";

// Define component
export default function ViewProjects() {
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

  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project._id === updatedProject._id ? updatedProject : project
    );
    setProjects(updatedProjects);
  };

  const PAGE_HEAD_OBJ = {
    pageTitle: "View Projects",
  };

  const TOP_TEXT_OBJ = {
    hasBottomText: false,
    styles: styles,
    headingText: "Our Current Projects",
    bottomText: "",
  };

  return (
    <div id="PAGE" className="page">
      <PageHead pageHeadObj={PAGE_HEAD_OBJ} />

      <div id="PAGE_CNT" className="page-cnt">
        <Nav />

        <TopText topTextObj={TOP_TEXT_OBJ} />
        <ViewProjectsMain projects={projects} loading={loading} />

        {/**
         */}
        {projects.map((project) => (
          <EditProjectForm
            key={project._id}
            project={project}
            onUpdate={handleUpdateProject}
          />
        ))}
        {projects.map((project) => (
          <ViewProject key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
