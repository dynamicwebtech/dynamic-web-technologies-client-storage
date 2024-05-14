/**
 *
 *  This is the checkAdminModeStatus hook
 *
 */

import { useState, useEffect } from "react";

const checkAdminModeStatus = () => {
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const CURRENT_USER = localStorage.getItem("Current User");
    setTimeout(() => {
      setAdminMode(CURRENT_USER ? true : false);

      if (CURRENT_USER) {
        console.log("The user is logged in!");

        // ... Manipulate some of the elements
      }
    }, 1800);
  }, []);

  return { adminMode };
};

export default checkAdminModeStatus;
