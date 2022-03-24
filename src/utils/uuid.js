import { loadFromLocalStorage } from "./localstorage";

export const uuidGen = () =>  Math.max(...(loadFromLocalStorage('tds').map(e => e.id)), 0) + 1;
