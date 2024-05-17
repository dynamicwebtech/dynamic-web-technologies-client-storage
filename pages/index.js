// React/Next Imports
import { useEffect } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../assets/styles/modules/Index/Index.module.css";
import { IndexTop } from "@/assets/components/pages/Index/IndexTop";
import { IndexLoginForm } from "@/assets/components/pages/Index/IndexLoginForm";

export default function Home() {
  const router = useRouter();

  return (
    <div
      id="PAGE"
      className="page"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F3F3",
        overflowX: "hidden",
        whiteSpace: "prewrap",
      }}
    >
      <div id="PAGE_CNT" style={{ maxWidth: "900px", margin: "auto" }}>
        <IndexTop />
        <IndexLoginForm />
      </div>
    </div>
  );
}
