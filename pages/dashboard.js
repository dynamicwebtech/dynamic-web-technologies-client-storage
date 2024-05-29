// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { PageHead } from "@/assets/components/global/All/PageHead";

import { Nav } from "@/assets/components/global/All/Nav";
import { DashboardMain } from "@/assets/components/pages/Dashboard/DashboardMain";
import { CustomerChatIFrame } from "@/assets/components/global/All/CustomerChatIFrame";
import { CompanyEmailIFrame } from "@/assets/components/global/All/CompanyEmailIFrame";

// Style Imports
import "../assets/styles/modules/Dashboard/Dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();

  const PAGE_HEAD_OBJ = {
    pageTitle: "Dashboard",
  };

  return (
    <div id="PAGE" className="page">
      <PageHead pageHeadObj={PAGE_HEAD_OBJ} />

      <div id="PAGE_CNT" className="page-cnt">
        <Nav />
        <DashboardMain />
      </div>

      {/**
      <CustomerChatIFrame />
      <CompanyEmailIFrame />
      */}
    </div>
  );
}
