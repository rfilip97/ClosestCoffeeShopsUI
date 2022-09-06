import { useShopsLoading } from "../hooks/useShopsLoading";
import { isSuccessfullResponse } from "../utils/responseCodes";
import { AppContent } from "./wrapperContent/AppContent";
import { ErrorContent } from "./wrapperContent/ErrorContent";
import { LoadingContent } from "./wrapperContent/LoadingContent";

import "../scss//app/_app.scss";

function AppWrapper() {
  const responseCode = useShopsLoading();

  const App = (props) => {
    const responseCode = props.responseCode;
    if (typeof responseCode === "number") {
      if (isSuccessfullResponse(responseCode)) {
        return <AppContent />;
      } else {
        return <ErrorContent responseCode={responseCode} />;
      }
    }

    return <LoadingContent />;
  };

  return <App responseCode={responseCode} />;
}

export default AppWrapper;
