/**
 *
 *  This is the getDatabaseData hook
 *
 */

import { useState, useEffect } from "react";

import { fetchReviews } from "../functions/async/fetchers/fetchReviews";
import { fetchPortfolioProjects } from "../functions/async/fetchers/fetchPortfolioProjects";

const getDatabaseData = () => {
  const [reviews, setReviews] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  useEffect(() => {
    fetchReviews(process.env.REVIEWS_FETCH_PATH, setReviews);
    fetchPortfolioProjects(
      process.env.PORTFOLIO_PROJECTS_FETCH_PATH,
      setPortfolioProjects
    );
  }, []);

  return { reviews, portfolioProjects };
};

export default getDatabaseData;
