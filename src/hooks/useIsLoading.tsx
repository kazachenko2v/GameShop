import React from "react";

const useIsLoading = (value: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (value !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [value]);

  return isLoading;
};

export default useIsLoading;
