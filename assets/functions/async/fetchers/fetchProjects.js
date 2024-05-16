/**
 *
 *  This is the fetchProjects async function
 *
 */

const fetchProjects = async (fetch_path, setter, lSName) => {
  try {
    const response = await fetch(fetch_path);
    if (response.ok) {
      const data = await response.json();
      setter(data);

      const STRINGIFY_DATA = JSON.stringify(data);

      localStorage.setItem(lSName, STRINGIFY_DATA);
    } else {
      console.error("Failed to fetch projects");
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export { fetchProjects };
