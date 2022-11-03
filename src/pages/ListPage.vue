<script setup>
import { useRoute } from 'vue-router';
import { router } from '../router/index.ts';
import { useLists } from '../composables/lists.ts';
import ConfirmButton from '../components/ConfirmButton.vue';

// TODO: Refactor.
const delete_text = 'Delete';

const {
  lists,
  saveChanges,
  cancelChanges,
  addItem,
  removeItem,
  deleteList,
  toggleCheckbox,
  getListIndexById,
} = useLists();

const route = useRoute();
const list_id = route.params.id;
const list_index = getListIndexById(list_id);

const save = () => {
  saveChanges();
  router.push('/lists');
};

const cancel = () => {
  cancelChanges();
};

const add = () => {
  addItem(list_index);
};

const remove = (item_index) => {
  removeItem(list_index, item_index);
};

const toggle = (item_index) => {
  toggleCheckbox(list_index, item_index);
};

const deleteConfirmed = () => {
  deleteList(list_index);
  saveChanges();
  router.push('/lists');
};

const updateTitle = (e) => {
  lists.value[list_index].title = e.target.innerText;
};
</script>

<template>
  <div class="main-column">
    <div class="buttons">
      <button class="btn" @click="save">Save</button>
      <button class="btn" @click="cancel">Cancel</button>
      <confirm-button
        :text="delete_text"
        @on-click="deleteConfirmed"
      ></confirm-button>
      <!-- <delete-pop-up-component :listId="list_id"></delete-pop-up-component> -->
      <button class="btn" @click="add">Add item</button>
    </div>
    <h2 contenteditable @input="updateTitle($event)">
      {{ lists[list_index].title }}
    </h2>
    <div
      v-for="(item, item_index) in lists[list_index].content"
      :key="item.id"
      class="todo-item"
    >
      <input
        v-model="lists[list_index].content[item_index].checked"
        type="checkbox"
      />
      <input
        v-model="lists[list_index].content[item_index].text"
        class="list-text"
        @keyup.exact.enter="toggle(item_index)"
      />
      <button class="btn" @click="remove(item_index)">Remove</button>
    </div>
  </div>
</template>
