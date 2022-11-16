import { readonly, ref } from 'vue';
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
  state: Readonly<{
    lists: Readonly<List[]>;
  }>;
  deleteList: (list_id: string | number) => void;
  cancelChanges: () => void;
  removeItem: (
    list_index: string | number,
    item_index: string | number
  ) => void;
  orderLists: (list_index, orderBy) => void;
  listsHaveChanges: () => boolean;
  newList: () => void;
  toggleCheckbox: (
    list_index: string | number,
    item_index: string | number
  ) => void;
  saveChanges: () => void;
  addItem: (list_index: string | number) => void;
  updateListTitle: (e: object, list_index: string | number) => void;
  swapItemsPosition: (
    list_index: string | number,
    draggedItemPosition: string | number,
    droppedItemPosition: string | number
  ) => void;
  getItemIndexByPosition: (
    list_id: string | number,
    item_position: string | number
  ) => any;
  getListIndexById: (id: string | number) => any;
}

const getListsFromStorage = () => {
  return JSON.parse(localStorage.getItem('lists') ?? '[]');
};

const lists = ref(getListsFromStorage());

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

  const deleteList = (list_id: string | number) => {
    const index = getListIndexById(list_id);
    lists.value.splice(index, 1);
    saveChanges();
  };

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

  const listsHaveChanges = () => {
    return JSON.stringify(lists.value) != JSON.stringify(getListsFromStorage());
  };

  const updateListTitle = (e, list_index) => {
    lists.value[list_index].title = e.target.innerText;
  };

  const orderLists = (list_index, orderBy) => {
    lists.value[list_index].content.sort((a, b) =>
      a[orderBy] > b[orderBy] ? 1 : -1
    );
  };

  const swapItemsPosition = (
    list_index,
    draggedItemPosition,
    droppedItemPosition
  ) => {
    const draggedItemIndex = getItemIndexByPosition(
      list_index,
      draggedItemPosition
    );
    const droppedItemIndex = getItemIndexByPosition(
      list_index,
      droppedItemPosition
    );
    // Swapping positions.
    lists.value[list_index].content[droppedItemIndex].position =
      draggedItemPosition;
    lists.value[list_index].content[draggedItemIndex].position =
      droppedItemPosition;
    orderLists(list_index, 'position');
  };

  return {
    state: readonly({
      lists: lists,
    }),
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
    updateListTitle,
    orderLists,
    swapItemsPosition,
  };
};
