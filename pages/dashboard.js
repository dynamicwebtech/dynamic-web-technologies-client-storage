// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { Nav } from "@/assets/components/global/All/Nav";
import { DashboardMain } from "@/assets/components/pages/Dashboard/DashboardMain";

// Style Imports
import "../assets/styles/modules/Dashboard/Dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div id="PAGE" className="page">
      <div id="PAGE_CNT" className="page-cnt">
        <Nav />
        <DashboardMain />
      </div>
    </div>
  );
}
