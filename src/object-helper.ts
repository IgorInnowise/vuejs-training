// Gets a max id value from objects. Example:  getItemWithMaxValueByKey('id', [{"id": 1}, {"id": 2}]) => 2
export const getItemWithMaxValueByKey = (key: string, objects: object[]) => {
  const ids = objects.map((object) => {
    return object[key];
  });
  if (ids.length === 0) {
    return 0;
  }
  return Math.max(...ids);
};
