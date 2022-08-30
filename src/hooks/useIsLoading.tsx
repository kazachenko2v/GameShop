import React from "react";

const useIsLoading = (value: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (value) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [value]);

  return isLoading;
};

export default useIsLoading;
