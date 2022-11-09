<script setup>
import Navbar from '../components/NavBar.vue';
import ConfirmButton from '../components/ConfirmButton.vue';
import { useRoute } from 'vue-router';
import { router } from '../router/index.ts';
import { useLists } from '../composables/lists.ts';
import { ButtonsName } from '../enum/buttons.ts';
import { computed } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

const {
  lists,
  saveChanges,
  cancelChanges,
  addItem,
  removeItem,
  deleteList,
  toggleCheckbox,
  getListIndexById,
  listsHaveChanges,
  getItemIndexByPosition,
} = useLists();

const route = useRoute();
const list_index = computed(() => getListIndexById(route.params.id));

const save = () => {
  saveChanges();
  router.push('/lists');
};

const deleteConfirmed = () => {
  deleteList(list_index.value);
  save();
};

const updateTitle = (e) => {
  lists.value[list_index.value].title = e.target.innerText;
};

// On route change.
const leave = () => {
  if (listsHaveChanges(lists.value)) {
    const answer = window.confirm(
      'Do you really want to leave? you have unsaved changes!'
    );
    if (!answer) {
      return false;
    }
    cancelChanges();
  }
  return true;
};
onBeforeRouteLeave((to, from) => {
  return leave();
});
onBeforeRouteUpdate(async (to, from) => {
  return leave();
});

// Ordering & Drag and Drop START.
const filtered_list = computed(() => {
  const orderBy = 'position';
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return lists.value[list_index.value].content.sort((a, b) =>
    a[orderBy] > b[orderBy] ? 1 : -1
  );
});

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('itemPosition', item.position);
};

const onDrop = (event, droppedItemPosition) => {
  const draggedItemPosition = event.dataTransfer.getData('itemPosition');
  const draggedItemIndex = getItemIndexByPosition(
    list_index.value,
    draggedItemPosition
  );
  const droppedItemIndex = getItemIndexByPosition(
    list_index.value,
    droppedItemPosition
  );
  // Swapping positions.
  lists.value[list_index.value].content[droppedItemIndex].position =
    draggedItemPosition;
  lists.value[list_index.value].content[draggedItemIndex].position =
    droppedItemPosition;
};
// Ordering & Drag and Drop END.
</script>

<template>
  <Navbar :lists="lists" @cancel-changes="cancelChanges" />
  <div class="main-column">
    <div class="buttons">
      <button class="btn" @click="save">Save</button>
      <ConfirmButton
        :btn-name="ButtonsName.CANCEL"
        class="btn"
        @on-confirm="cancelChanges"
      ></ConfirmButton>
      <ConfirmButton
        :btn-name="ButtonsName.DELETE"
        class="btn"
        @on-confirm="deleteConfirmed"
      ></ConfirmButton>
      <button class="btn" @click="addItem(list_index)">Add item</button>
    </div>
    <h2 contenteditable @input="updateTitle($event)">
      {{ lists[list_index].title }}
    </h2>
    <div
      v-for="(item, item_index) in filtered_list"
      :key="item.id"
      draggable="true"
      class="todo-item"
      @dragstart="startDrag($event, item)"
      @drop="onDrop($event, item.position)"
      @dragenter.prevent
      @dragover.prevent
    >
      <input
        v-model="lists[list_index].content[item_index].checked"
        type="checkbox"
      />
      <input
        v-model="lists[list_index].content[item_index].text"
        class="list-text"
        @keyup.exact.enter="toggleCheckbox(list_index, item_index)"
      />
      <button class="btn" @click="removeItem(list_index, item_index)">
        Remove
      </button>
    </div>
  </div>
</template>
