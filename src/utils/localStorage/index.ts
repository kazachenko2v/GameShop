export const localStorageGetItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "");
};

export const setLocalStorage = (
  key: string,
  value: number | string | number[]
) => {
  let data = localStorageGetItem(key);
  if (!data) {
    const newArr = [value];
    localStorage.setItem("favorites", JSON.stringify(newArr));
  } else {
    localStorage.setItem("favorites", JSON.stringify([...data, value]));
  }
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

export const removeItemLocalStorage = (key: string, value: number) => {
  let data = getLocalStorage(key);
  if (!data) {
    return;
  }

  const newData = data.filter((gameId: number) => gameId !== value);

  localStorage.setItem(key, JSON.stringify(newData));
};
