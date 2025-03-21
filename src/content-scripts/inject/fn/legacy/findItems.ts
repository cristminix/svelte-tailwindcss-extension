import { isEqual } from "./isEqual";
export function findItems(searchTerm: string, source: any) {
  let __searchTerm__ = searchTerm;
  let __results__: any[] = [];

  function resultExist(resultItem: any) {
    for (let index in __results__) {
      if (isEqual(resultItem, __results__[index])) {
        return true;
      }
    }
    return false;
  }
  function searchItem(item: any) {
    if ("undefined" == typeof item || item == null) {
      return;
    }
    Object.keys(item).forEach((key) => {
      if (typeof item[key] === "object") {
        searchItem(item[key]);
      }
      if (typeof item[key] === "string") {
        let searchAsRegEx = new RegExp(__searchTerm__, "gi");
        if (item[key].match(searchAsRegEx)) {
          if (!resultExist(item)) {
            __results__.push(item);
          }
        }
      }
    });
  }
  searchItem(source);

  return __results__;
}
