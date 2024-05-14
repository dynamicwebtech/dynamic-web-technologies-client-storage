/**
 *
 *  This is the getDatabaseData hook
 *
 */

import { useState, useEffect } from "react";

import { fetchReviews } from "../functions/async/fetchers/fetchReviews";
import { fetchPortfolioProjects } from "../functions/async/fetchers/fetchPortfolioProjects";

const getDatabaseData = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchReviews("/api/getClients", setClients);
  }, []);

  return { clients };
};

export default getDatabaseData;
