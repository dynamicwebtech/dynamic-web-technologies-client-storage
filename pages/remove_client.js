// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { Nav } from "@/assets/components/global/All/Nav";

// Style Imports
import "../assets/styles/modules/RemoveClient/RemoveClient.module.css";

export default function RemoveClient() {
  const router = useRouter();

  return (
    <div id="PAGE" className="page">
      <div id="PAGE_CNT" className="page-cnt">
        <Nav />
      </div>
    </div>
  );
}
