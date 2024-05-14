/**
 *
 *  This is the checkLocalHostStatus hook
 *
 */

import { useState, useEffect } from "react";

const checkLocalHostStatus = () => {
  const [onLocalHost, setOnLocalHost] = useState(null);

  useEffect(() => {
    const IS_LOCAL_HOST =
      window.location.hostname === "localhost" ||
      window.location.hostname === "localhost:3000" ||
      window.location.hostname === "127.0.0.1";

    setOnLocalHost(IS_LOCAL_HOST);

    // if (IS_LOCAL_HOST) {
    //   console.log("The user is on LocalHost");
    // }
  }, []);

  return { onLocalHost };
};

export default checkLocalHostStatus;
