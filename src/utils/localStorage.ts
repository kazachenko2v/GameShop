const localStorageGetItem = (key: string) => {
  if (key in localStorage) {
    return JSON.parse(localStorage.getItem(key) || "");
  }
};

export const setLocalStorage = (
  key: string,
  value: number | string | string[]
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  if (!localStorageGetItem(key)) {
    return;
  }
  return localStorageGetItem(key);
};
