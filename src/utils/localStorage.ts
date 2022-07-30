const localStorageGetItem = (key: string) => {
  if (key in localStorage) {
    return JSON.parse(localStorage.getItem(key) || "");
  }
};

export const setLocalStorage = (
  key: string,
  value: number | string | string[] | number[]
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  if (key === "search") {
    return localStorage.getItem(key);
  }
  if (!localStorageGetItem(key)) {
    return;
  }
  return localStorageGetItem(key);
};

export const addItemLocalStorage = (key: string, value: number) => {
  let data = getLocalStorage(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify([value]));
  } else {
    localStorage.setItem(key, JSON.stringify([...data, value]));
  }
};

export const removeItemLocalStorage = (key: string, value: number) => {
  let data = getLocalStorage(key);
  if (!data) {
    return;
  }

  const newData = data.filter((gameId: number) => gameId !== value);

  localStorage.setItem(key, JSON.stringify(newData));
};
