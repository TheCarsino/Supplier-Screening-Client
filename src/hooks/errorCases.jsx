export default function errorCases(errorJson) {
  let errorString = "";
  if (errorJson.message != null) {
    errorString = errorJson.message;
  } else if (errorJson.title != null) {
    errorString = errorJson.title;
    for (const key in errorJson.errors) {
      for (const errorDetail of errorJson.errors[key])
        errorString += `|${errorDetail}`;
    }
  }
  return errorString;
}
