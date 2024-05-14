/**
 *
 *  This is used to declare either a local or session storage variable
 *  @param {string} storageType - The string for the storageType (session, local)
 *  @param {string} variableName - The string for the variable name
 *  @param {string} variableValue - The string for the variable value
 *
 *
 */

export default function DeclareStorageVariable(
  storageType,
  variableName,
  variableValue
) {
  if (storageType == "session") {
    sessionStorage.setItem(variableName, variableValue);
  }

  if (storageType == "local") {
    localStorage.setItem(variableName, variableValue);
  }
}
