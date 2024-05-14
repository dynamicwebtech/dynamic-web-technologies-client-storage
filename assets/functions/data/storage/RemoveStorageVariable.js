/**
 *
 *  This is used to remove either a local or session storage variable
 *  @param {string} storageType - The string for the storageType (session, local)
 *  @param {string} variableName - The string for the variable name
 *
 */

export default function RemoveStorageVariable(storageType, variableName) {
  if (storageType == "session") {
    sessionStorage.removeItem(variableName);
  }

  if (storageType == "local") {
    localStorage.removeItem(variableName);
  }
}
