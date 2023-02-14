<template>
  <div
    class="container w-1/3 py-7 mt-10 flex flex-col items-center gap-4 text-black bg-white py-4 rounded-lg"
  >
    <div class="flex w-full">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-xl ml-3 text-center">{{ tempNote.name }}</p>
      </div>
      <div class="flex items-center justify-end">
        <button @click="toggleExitModal">
          <i class="fa-sharp fa-solid fa-arrow-right-from-bracket text-xl"></i>
        </button>
      </div>
    </div>
    <div>
      <div
        v-for="todo in tempNote.todoList"
        :key="todo.id"
        class="flex items-center"
      >
        <div class="flex items-center">
          <input
            v-if="todo.done"
            id="green-checkbox"
            v-model="todo.done"
            checked
            type="checkbox"
            class="w-4 h-4 accent-green-600 rounded"
          />
          <input
            v-else
            id="red-checkbox"
            v-model="todo.done"
            type="checkbox"
            class="w-4 h-4 rounded"
          />
          <label
            v-if="todo.done && !todo.inputChange"
            for="green-checkbox"
            class="w-64 px-4 py-0.5 mx-2 my-1.5 rounded-lg text-sm font-medium text-green-600"
          >
            {{ todo.name }}
          </label>
          <label
            v-else-if="!todo.done && !todo.inputChange"
            for="red-checkbox"
            class="w-64 px-4 py-0.5 mx-2 my-1.5 rounded-lg text-sm"
          >
            {{ todo.name }}
          </label>
          <input
            v-else
            v-model="todo.name"
            type="text"
            :placeholder="todo.name"
            class="w-64 placeholder-neutral-300 text-sm px-4 py-0.5 mx-2 my-0.5 border-2 border-neutral-300 rounded-lg focus:ring-neutral-800 focus:border-neutral-800"
          />
          <button class="text-sm" @click="todo.inputChange = !todo.inputChange">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="ml-2 text-sm" @click="deleteTodoListItem(todo.id)">
            <i class="fa-solid fa-trash text-sm"></i>
          </button>
        </div>
      </div>
      <div class="mt-4">
        <button
          type="submit"
          class="text-white text-sm py-2 px-4 bg-neutral-500 border hover:bg-todo-black duration-150 rounded-full"
          @click="handleSaving"
        >
          Save changes
        </button>
        <button
          type="submit"
          class="text-sm py-2 px-3 ml-4 bg-white border border-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
          @click="addTodoField"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
  <ExitModal
    :modal-active="ExitModalActive"
    @undo-changes="toggleExitModal"
    @submit-changes="handleSaving"
  >
  </ExitModal>
</template>

<script setup lang="ts">
import { notes, Todo } from '../store/notes';
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ExitModal from './ExitModal.vue';

const route = useRoute();
const router = useRouter();
const index = Number(route.params.id);

const tempNote = ref(JSON.parse(JSON.stringify(notes.value[index])));
const isChanged = ref(false);
const ExitModalActive = ref(false);

const toggleExitModal = () => {
  if (isChanged.value) ExitModalActive.value = !ExitModalActive.value;
  else router.push({ name: 'home' });
};
const deleteTodoListItem = (id: number) => {
  const i = tempNote.value.todoList.findIndex((t: Todo) => t.id == id);
  tempNote.value.todoList.splice(i, 1);
};
const handleSaving = () => {
  notes.value[index] = tempNote.value;
  isChanged.value = false;
  if (ExitModalActive.value) toggleExitModal();
};

const addTodoField = () => {
  const length = tempNote.value.todoList.length;
  tempNote.value.todoList.push({
    id: tempNote.value.todoList[length - 1].id + 1,
    name: '',
    done: false,
  });
};

watch(
  tempNote.value.todoList,
  (newValue: Todo[]) => {
    isChanged.value = true;
    for (const todo of newValue) {
      if (!todo.done) {
        notes.value[index].done = false;
        return;
      }
    }
    notes.value[index].done = true;
  },
  { deep: true }
);
</script>
