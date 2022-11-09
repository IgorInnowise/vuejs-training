import { ref, Ref } from 'vue';
import { getItemWithMaxValueByKey } from '../object-helper';

interface Item {
  id: string | number;
  text: string;
  checked: boolean;
  position: string | number;
}

export interface List {
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
  const getListsFromStorage = () => {
    return JSON.parse(localStorage.getItem('lists') ?? '[]');
  };

  const getListIndexById = (id: string | number) => {
    return lists.value.findIndex((list: object) => list.id == id);
  };

  const newList = () => {
    lists.value.push({
      id: getItemWithMaxValueByKey('id', lists.value) + 1,
      title: 'New list',
      content: [],
    });
    saveChanges();
  };

  const deleteList = (list_index: string | number) => {
    lists.value.splice(list_index, 1);
  };

  const lists = ref(getListsFromStorage());

  const saveChanges = () => {
    localStorage.setItem('lists', JSON.stringify(lists.value));
  };

  const cancelChanges = () => {
    lists.value = getListsFromStorage();
  };

  const addItem = (list_index: string | number) => {
    lists.value[list_index].content.push({
      id: getItemWithMaxValueByKey('id', lists.value[list_index].content) + 1,
      text: 'New item',
      checked: false,
      position:
        getItemWithMaxValueByKey('position', lists.value[list_index].content) +
        1,
    });
  };

  const removeItem = (
    list_index: string | number,
    item_index: string | number
  ) => {
    lists.value[list_index].content.splice(item_index, 1);
  };

  const getItemIndexByPosition = (
    list_id: string | number,
    item_position: string | number
  ) => {
    return lists.value[list_id].content.findIndex(
      (item: object) => item.position == item_position
    );
  };

  const toggleCheckbox = (
    list_index: string | number,
    item_index: string | number
  ) => {
    lists.value[list_index].content[item_index].checked =
      !lists.value[list_index].content[item_index].checked;
  };

  const listsHaveChanges = (current_lists: List[]) => {
    return (
      JSON.stringify(current_lists) != JSON.stringify(getListsFromStorage())
    );
  };

  return {
    lists,
    getListIndexById,
    getItemIndexByPosition,
    newList,
    deleteList,
    saveChanges,
    cancelChanges,
    addItem,
    removeItem,
    toggleCheckbox,
    listsHaveChanges,
  };
};
