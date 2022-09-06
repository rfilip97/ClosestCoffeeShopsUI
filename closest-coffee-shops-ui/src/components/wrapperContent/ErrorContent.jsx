import { isSuccessfullResponse } from "../../utils/responseCodes";

export const ErrorContent = (props) => {
  return getErrorMessage(props.responseCode);
};

const getErrorMessage = (responseCode) => {
  const errorResponse = (responseText, responseCode) => {
    return <p>{`${responseText}, errorCode: ${responseCode}`}</p>;
  };

  if (isSuccessfullResponse(responseCode)) {
    return errorResponse("Operation successfull", JSON.stringify(responseCode));
  }

  switch (responseCode) {
    case 401:
      return errorResponse(
        "Failed fetching coffee shops list - Unauthorized",
        responseCode
      );

    case 406:
      return errorResponse(
        "Failed fetching coffee shops list - Unacceptable Accept format",
        responseCode
      );

    case 503:
      return errorResponse(
        "Failed fetching coffee shops list - Service Unavailable",
        responseCode
      );

    case 504:
      return errorResponse(
        "Failed fetching coffee shops list - Timeout",
        responseCode
      );

    default:
      return errorResponse("Failed fetching coffee shops list", responseCode);
  }
};
