// Gets a max id value from objects. Example: [{"id": 1}, {"id": 2}] => 2
export const getMaxId = (objects: object[]) => {
  const ids = objects.map((object) => {
    return object.id;
  });
  if (ids.length === 0) {
    return 0;
  }
  return Math.max(...ids);
};