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

export function errorCasesScreen(errorJson) {
  let errorString = "Detailed message.";
  errorString += `|Offshore Leaks: (${errorJson.offshoreDetail.code}) ${errorJson.offshoreDetail.message}`;
  errorString += `|World Bank Debarred: (${errorJson.worldBankDetail.code}) ${errorJson.worldBankDetail.message}`;
  errorString += `|OFAC Sanctions: (${errorJson.ofacDetail.code}) ${errorJson.ofacDetail.message}`;
  return errorString;
}
