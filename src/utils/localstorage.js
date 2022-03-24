export const loadFromLocalStorage = (key) =>
  localStorage.getItem(key) === null
    ? []
    : JSON.parse(localStorage.getItem(key));

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}