<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMaxId } from '../js/list.js';
import { router } from '../router/index.ts';

const lists = ref(JSON.parse(localStorage.getItem('lists')) ?? []);

const route = useRoute();
const id = route.params.id; // read parameter id (it is reactive)
const list_index = lists.value.findIndex((item) => item.id == id);

function saveChanges() {
  localStorage.setItem('lists', JSON.stringify(lists.value));
  router.push('/lists');
}

function cancelChanges() {
  lists.value = JSON.parse(localStorage.getItem('lists')) ?? [];
}

function deleteList() {
  lists.value.splice(list_index, 1);
  saveChanges();
}

function addItem() {
  lists.value[list_index].content.push({
    id: getMaxId(lists.value[list_index].content) + 1,
    text: 'New item',
  });
}

function removeItem(item_index) {
  lists.value[list_index].content.splice(item_index, 1);
}

const pop_up_opened = ref(false);
</script>

<template>
  <div class="main-column">
    <div class="buttons">
      <button class="btn" @click="saveChanges">Save</button>
      <button class="btn" @click="cancelChanges">Cancel</button>
      <button class="btn" @click="pop_up_opened = true">Delete</button>
      <button class="btn" @click="addItem">Add item</button>
    </div>
    <h2>{{ lists[list_index].title }}</h2>
    <div
      v-for="(item, item_index) in lists[list_index].content"
      :key="item.id"
      class="todo-item"
    >
      <input
        v-model="lists[list_index].content[item_index].text"
        contenteditable
      />
      <button class="btn" @click="removeItem(item_index)">Remove</button>
    </div>
    <!-- Delete Modal START -->
    <Teleport to="body">
      <div v-if="pop_up_opened" class="modal-pop-up">
        <p>Sure?</p>
        <button class="btn" @click="deleteList()">Delete</button>
        <button class="btn" @click="pop_up_opened = false">Cancel</button>
      </div>
    </Teleport>
    <!-- Delete Modal END -->
  </div>
</template>
