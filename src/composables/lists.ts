import { ref, Ref } from 'vue';
import { getMaxId } from '../object-helper';

interface Item {
  id: number;
  text: string;
  checked: boolean;
}

interface List {
  id: number;
  title: string;
  content: Item[];
}

interface ListsModule {
  lists: Ref<List[]>;

  getListIndexById: (id: string | number) => any;
  newList: () => void;
  deleteList: (list_index: string | number) => void;
  saveChanges: () => void;
  cancelChanges: () => void;

  addItem: (list_index: string | number) => void;
  removeItem: (
    list_index: string | number,
    item_index: string | number
  ) => void;
  toggleCheckbox: (
    list_index: string | number,
    item_index: string | number
  ) => void;
}

export const useLists: () => ListsModule = () => {
  const getListFromStorage = () => {
    return JSON.parse(localStorage.getItem('lists') ?? '[]');
  };

  const getListIndexById = (id: string | number) => {
    return lists.value.findIndex((list: object) => list.id == id);
  };

  const newList = () => {
    lists.value.push({
      id: getMaxId(lists.value) + 1,
      title: 'New list',
      content: [],
    });
    saveChanges();
  };

  const deleteList = (list_index: string | number) => {
    lists.value.splice(list_index, 1);
  };

  const lists = ref(getListFromStorage());

  const saveChanges = () => {
    localStorage.setItem('lists', JSON.stringify(lists.value));
  };

  const cancelChanges = () => {
    lists.value = getListFromStorage();
  };

  const addItem = (list_index: string | number) => {
    lists.value[list_index].content.push({
      id: getMaxId(lists.value[list_index].content) + 1,
      text: 'New item',
      checked: false,
    });
  };

  const removeItem = (
    list_index: string | number,
    item_index: string | number
  ) => {
    lists.value[list_index].content.splice(item_index, 1);
  };

  const toggleCheckbox = (
    list_index: string | number,
    item_index: string | number
  ) => {
    lists.value[list_index].content[item_index].checked =
      !lists.value[list_index].content[item_index].checked;
  };

  return {
    lists,
    getListIndexById,
    newList,
    deleteList,
    saveChanges,
    cancelChanges,
    addItem,
    removeItem,
    toggleCheckbox,
  };
};
