/**
 *
 *  This is the fetchPortfolioProjects async function
 *
 */

const fetchPortfolioProjects = async (fetch_path, setter, lSName) => {
  try {
    const response = await fetch(fetch_path);
    if (response.ok) {
      const data = await response.json();
      setter(data);

      const STRINGIFY_DATA = JSON.stringify(data);

      localStorage.setItem(lSName, STRINGIFY_DATA);
    } else {
      console.error("Failed to fetch portfolio projects");
    }
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
  }
};

export { fetchPortfolioProjects };
