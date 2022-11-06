import { useState } from "react";
import { ErrorMessage } from "../components";

export const withError = (View: any) => {
  return (props: any) => {
    const [errorApi, setErrorApi] = useState(false);

    return (
      <>
        {errorApi ? (
          <ErrorMessage />
        ) : (
          <View setErrorApi={setErrorApi} {...props} />
        )}
      </>
    );
  };
};
