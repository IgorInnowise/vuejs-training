import { ref } from 'vue';
import { getMaxId } from '../js/object-helper.js';

export const useLists = () => {
  const lists = ref(JSON.parse(localStorage.getItem('lists') ?? '[]'));

  const saveChanges = () => {
    localStorage.setItem('lists', JSON.stringify(lists.value));
  };

  const cancelChanges = () => {
    lists.value = JSON.parse(localStorage.getItem('lists') ?? '[]');
  };

  const removeItem = (
    list_index: string | number,
    item_index: string | number
  ) => {
    lists.value[list_index].content.splice(item_index, 1);
  };

  const newList = () => {
    lists.value.push({
      id: getMaxId(lists.value) + 1,
      title: 'New list',
      content: [],
    });
    localStorage.setItem('lists', JSON.stringify(lists.value));
  };

  const addItem = (list_index: string | number) => {
    lists.value[list_index].content.push({
      id: getMaxId(lists.value[list_index].content) + 1,
      text: 'New item',
      checked: false,
    });
  };

  const toggleCheckbox = (
    list_index: string | number,
    item_index: string | number
  ) => {
    lists.value[list_index].content[item_index].checked =
      !lists.value[list_index].content[item_index].checked;
  };

  const getListIndexById = (id: string | number) => {
    return lists.value.findIndex((list: object) => list.id == id);
  };

  const deleteList = (list_index: string | number) => {
    lists.value.splice(list_index, 1);
  };

  return {
    lists,
    saveChanges,
    cancelChanges,
    removeItem,
    addItem,
    newList,
    deleteList,
    toggleCheckbox,
    getListIndexById,
  };
};
