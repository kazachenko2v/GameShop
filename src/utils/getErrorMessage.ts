export interface ErrWithCode extends Error {
  code: string;
}

export const getErrorMessage = (error: ErrWithCode) => {
  if (error instanceof Error) {
    const newStr = error.code.replace("auth/", "").replace(/-/g, " ");

    return newStr[0].toUpperCase() + newStr.slice(1);
  }
  return String(error);
};
