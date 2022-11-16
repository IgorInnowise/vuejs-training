<script setup>
import ConfirmButton from '../components/ConfirmButton.vue';
import { useRoute } from 'vue-router';
import { router } from '../router/index.ts';
import { useLists } from '../composables/lists.ts';
import { ButtonsNameEnum } from '../enum/buttons-enum.ts';
import { computed } from 'vue';

const {
  state,
  cancelChanges,
  addItem,
  removeItem,
  deleteList,
  toggleCheckbox,
  getListIndexById,
  saveChanges,
  updateListTitle,
  orderLists,
  swapItemsPosition,
} = useLists();

const route = useRoute();
const list_index = computed(() => getListIndexById(route.params.id));

// Ordering and saving list's items, to avoid a change confirmation after.
orderLists(list_index.value, 'position');
saveChanges();

const saveClick = () => {
  saveChanges();
  router.push({ name: 'lists' });
};

const deleteConfirmed = (list_index) => {
  deleteList(list_index);
  router.push({ name: 'lists' });
};

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('itemPosition', item.position);
};

const onDrop = (event, droppedItemPosition) => {
  const draggedItemPosition = event.dataTransfer.getData('itemPosition');
  swapItemsPosition(list_index.value, draggedItemPosition, droppedItemPosition);
};
</script>

<template>
  <div class="main-column">
    <div class="buttons">
      <button class="btn" @click="saveClick">Save</button>
      <ConfirmButton
        :btn-name="ButtonsNameEnum.CANCEL"
        class="btn"
        @on-confirm="cancelChanges"
      ></ConfirmButton>
      <ConfirmButton
        :btn-name="ButtonsNameEnum.DELETE"
        class="btn"
        @on-confirm="deleteConfirmed(list_index)"
      ></ConfirmButton>
      <button class="btn" @click="addItem(list_index)">Add item</button>
    </div>
    <h2 contenteditable @input="updateListTitle($event, list_index)">
      {{ state.lists[list_index].title }}
    </h2>
    <div
      v-for="(item, item_index) in state.lists[list_index].content"
      :key="item.id"
      draggable="true"
      class="todo-item"
      @dragstart="startDrag($event, item)"
      @drop="onDrop($event, item.position)"
      @dragenter.prevent
      @dragover.prevent
    >
      <input
        v-model="state.lists[list_index].content[item_index].checked"
        type="checkbox"
      />
      <input
        v-model="state.lists[list_index].content[item_index].text"
        class="list-text"
        @keyup.exact.enter="toggleCheckbox(list_index, item_index)"
      />
      <button class="btn" @click="removeItem(list_index, item_index)">
        Remove
      </button>
    </div>
  </div>
</template>
