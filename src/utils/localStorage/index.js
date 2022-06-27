export const setLocalStorage = (key, value) => {
  let data = JSON.parse(localStorage.getItem(key));
  if (!data) {
    const newArr = [value];
    localStorage.setItem("favorites", JSON.stringify(newArr));
  } else {
    localStorage.setItem("favorites", JSON.stringify([...data, value]));
  }
};

export const getLocalStorage = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    return;
  }
  return JSON.parse(localStorage.getItem(key));
};

export const removeItemLocalStorage = (key, value) => {
  let data = getLocalStorage(key);
  if (!data) {
    return;
  }

  const newData = data.filter((item) => item.id !== value);

  localStorage.setItem(key, JSON.stringify(newData));
};
