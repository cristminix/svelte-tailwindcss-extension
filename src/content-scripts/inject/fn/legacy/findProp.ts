export const findProp = (key: string, src: any) => {
  const regexObj = new RegExp("^" + key, "g");
  for (let k in src) {
    if (k.match(regexObj)) {
      return src[k];
    }
  }
  return null;
};
