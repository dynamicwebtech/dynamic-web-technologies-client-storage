/**
 *
 *  This is the fetchBlogPosts async function
 *
 */

const fetchBlogPosts = async (fetch_path, setter, lSName) => {
  try {
    const response = await fetch(fetch_path);
    if (response.ok) {
      const data = await response.json();
      setter(data);

      const STRINGIFY_DATA = JSON.stringify(data);

      localStorage.setItem(lSName, STRINGIFY_DATA);
    } else {
      console.error("Failed to fetch blog posts");
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
};

export { fetchBlogPosts };
