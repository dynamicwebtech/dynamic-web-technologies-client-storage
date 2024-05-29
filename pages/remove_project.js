// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { Nav } from "@/assets/components/global/All/Nav";

// Style Imports
import "../assets/styles/modules/RemoveProject/RemoveProject.module.css";

export default function RemoveProject() {
  const router = useRouter();

  const PAGE_HEAD_OBJ = {
    pageTitle: "Remove Project(s)",
  };

  return (
    <div id="PAGE" className="page">
      <PageHead pageHeadObj={PAGE_HEAD_OBJ} />

      <div id="PAGE_CNT" className="page-cnt">
        <Nav />
      </div>
    </div>
  );
}
