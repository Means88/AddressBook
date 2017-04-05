export function setToList(set) {
  const list = [];
  for (const value of set) {
    list.push(value);
  }
  return list;
}