import { useShopsLoading } from "../hooks/useShopsLoading";
import { isSuccessfullResponse } from "../utils/responseCodes";
import { AppContent } from "./wrapperContent/AppContent";
import { ErrorContent } from "./wrapperContent/ErrorContent";

import "../scss//app/_app.scss";

function AppWrapper() {
  const responseCode = useShopsLoading();

  const App = (props) => {
    const responseCode = props.responseCode;

    if (isSuccessfullResponse(responseCode)) {
      return <AppContent />;
    }

    return <ErrorContent responseCode={responseCode} />;
  };

  return <App responseCode={responseCode} />;
}

export default AppWrapper;
