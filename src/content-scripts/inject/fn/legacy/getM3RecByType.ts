export const getM3RecByType = (type: string, m3Rec: any) => {
  let results = [];
  for (let m in m3Rec) {
    if ("undefined" !== typeof m3Rec[m]._data.$type) {
      if (m3Rec[m]._data.$type == type) {
        results.push([m, m3Rec[m]._data]);
      }
    }
  }
  return results;
};
