/**
 *
 *  This is used to check the window.location in an async
 *
 */

export default async function checkLocation() {
  try {
    // Creating a Promise to check the window.location
    return new Promise((resolve, reject) => {
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        resolve("true");
      } else {
        resolve("false");
      }
    });
  } catch (error) {
    console.error("Error checking window.location: ", error);
    throw error;
  }
}
