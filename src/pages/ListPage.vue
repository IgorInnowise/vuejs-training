<script setup>
import { useRoute } from 'vue-router';
import { router } from '../router/index.ts';
import { useLists } from '../composables/lists.ts';
import ConfirmButton from '../components/ConfirmButton.vue';
import { ButtonsName } from '../enum/buttons.ts';

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

const deleteConfirmed = () => {
  deleteList(list_index);
  save();
};

const updateTitle = (e) => {
  lists.value[list_index].title = e.target.innerText;
};
</script>

<template>
  <div class="main-column">
    <div class="buttons">
      <button class="btn" @click="save">Save</button>
      <confirm-button
        :button-name="ButtonsName.CANCEL"
        @on-confirm="cancelChanges"
      ></confirm-button>
      <confirm-button
        :button-name="ButtonsName.DELETE"
        @on-confirm="deleteConfirmed"
      ></confirm-button>
      <button class="btn" @click="addItem(list_index)">Add item</button>
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
        @keyup.exact.enter="toggleCheckbox(list_index, item_index)"
      />
      <button class="btn" @click="removeItem(list_index, item_index)">
        Remove
      </button>
    </div>
  </div>
</template>
