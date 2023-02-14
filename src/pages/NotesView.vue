<template>
  <div
    v-if="notes.length === 0"
    class="flex items-center justify-center h-64 text-white text-3xl"
  >
    You don't have any saved notes
  </div>
  <div v-else class="container grid grid-cols-2 content-center gap-4 py-4">
    <div v-for="(note, i) in notes" :key="note.id" class="place-self-center">
      <div class="flex flex-col p-8 gap-2 bg-white text-black rounded-lg">
        <div class="flex flex-row">
          <div class="flex items-center text-xl pl-1">
            {{ note.name }}
          </div>
          <div class="flex items-center flex-1 justify-end">
            <button
              class="text-black bg-white py-0.5 px-2 hover:text-white hover:bg-todo-black duration-150 rounded-full"
              @click="toggleDeleteModal(note.id)"
            >
              ✕
            </button>
          </div>
        </div>
        <div
          v-for="(todo, j) in note.todoList"
          :key="todo.id"
          class="flex items-center"
        >
          <div v-if="j < 2">
            <div v-if="todo.done" class="flex items-center">
              <input
                id="green-checkbox"
                disabled
                checked
                type="checkbox"
                class="w-4 h-4 accent-green-600 rounded"
              />
              <label
                for="green-checkbox"
                class="w-64 px-4 py-1 rounded-lg text-sm font-medium text-green-600"
              >
                {{ todo.name }}
              </label>
            </div>
            <div v-else class="flex items-center">
              <input
                id="red-checkbox"
                disabled
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <label
                for="red-checkbox"
                class="w-64 px-4 py-1 rounded-lg text-sm"
              >
                {{ todo.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div v-if="note.todoList.length > 2" class="pl-4 text-sm">
            and {{ note.todoList.length - 2 }} more todo(s)
          </div>
          <div class="flex flex-1 justify-end">
            <RouterLink
              :to="{
                name: 'noteEdit',
                params: {
                  id: i,
                },
              }"
              class="text-sm py-0.5 px-4 bg-white border border-neutral-800 hover:text-white hover:bg-todo-black duration-150 rounded-full"
            >
              Edit
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteModal
    :modal-active="deleteModalActive"
    @cancel-deleting="toggleDeleteModal"
    @submit-deleting="toggleDeleteModal"
  >
  </DeleteModal>
</template>

<script setup lang="ts">
import { notes, delete_id } from '../store/notes';
import { onMounted, ref } from 'vue';
import DeleteModal from './DeleteModal.vue';

const deleteModalActive = ref(false);

const toggleDeleteModal = (id: number) => {
  deleteModalActive.value = !deleteModalActive.value;
  delete_id.value = id;
};

onMounted(() => {
  let ls = localStorage.getItem('notes');
  if (ls != null) {
    notes.value = JSON.parse(ls) || [];
  }
});
</script>
