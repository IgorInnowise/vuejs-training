<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-8 bg-white self-start m-auto mt-64 max-w-screen-sm rounded-lg"
          >
            <h1 class="text-xl mb-2 text-center">CREATE NOTE</h1>
            <div>
              <form class="creating-form" @submit.prevent="handleCreating">
                <label for="note-title" class="block mb-2 font-medium"
                  >Note title</label
                >
                <input
                  id="note-title"
                  v-model="formData.note_name"
                  type="text"
                  placeholder="e.g. cases for a week"
                  class="block placeholder-neutral-300 w-full p-2 border border-neutral-300 rounded-lg focus:ring-neutral-800 focus:border-neutral-800"
                />
                <p class="mb-2 mt-2 font-medium">Todo list</p>
                <ul
                  v-for="todo in formData.todoList"
                  :key="todo.id"
                  class="list-disc"
                >
                  <li>
                    <input
                      v-model="todo.name"
                      type="text"
                      placeholder="e.g. make purchases"
                      class="w-11/12 placeholder-neutral-300 text-sm mb-2 p-2 border border-neutral-300 rounded-lg focus:ring-neutral-800 focus:border-neutral-800"
                    />
                    <button
                      class="ml-4 py-0.5 px-2 text-black bg-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
                      @click="deleteTodoListItem(todo.id)"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </li>
                </ul>
                <div class="flex justify-between mt-5">
                  <div>
                    <button
                      type="submit"
                      class="text-white text-sm py-2 px-6 bg-neutral-500 border hover:bg-todo-black duration-150 rounded-full"
                      @submit="handleCreating"
                    >
                      Create
                    </button>
                  </div>
                  <div>
                    <button
                      class="text-sm py-2 px-3 bg-white border border-neutral-800 hover:text-white hover:bg-todo-black duration-150 rounded-full"
                      @click="addTodoFieldToModal"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <div>
                    <button
                      class="text-sm py-2 px-6 bg-white border border-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
                      @click="cancelCreating"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { notes } from '../store/notes';
import { onMounted, ref, watch } from 'vue';

const emits = defineEmits(['cancel-creating', 'submit-creating']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});

const note_id = ref(0);
const todo_id = ref(0);

const formData = ref({
  note_name: '',
  todoList: [{ id: todo_id.value, name: '', done: false, inputChange: false }],
});

const deleteTodoListItem = (id: number) => {
  if (formData.value.todoList.length === 1) {
    return;
  }
  const index = formData.value.todoList.findIndex((t) => t.id == id);
  formData.value.todoList.splice(index, 1);
};
const cancelCreating = () => {
  todo_id.value = 0;
  formData.value.note_name = '';
  formData.value.todoList = [{ id: todo_id.value, name: '', done: false }];
  emits('cancel-creating');
};
const addTodoFieldToModal = () => {
  todo_id.value++;
  formData.value.todoList.push({ id: todo_id.value, name: '', done: false });
};
const handleCreating = () => {
  if (formData.value.note_name.trim() === '') {
    return;
  }
  for (const todo of formData.value.todoList) {
    if (todo.name.trim() === '') {
      return;
    }
  }

  notes.value.push({
    id: note_id.value,
    name: formData.value.note_name,
    todoList: formData.value.todoList,
    done: false,
  });

  todo_id.value = 0;
  formData.value.note_name = '';
  formData.value.todoList = [
    { id: todo_id.value, name: '', done: false, inputChange: false },
  ];
  note_id.value++;

  emits('submit-creating');
};

watch(note_id, (newValue) => {
  localStorage.setItem('note_id', newValue.toString());
});

watch(
  notes,
  (newValue) => {
    localStorage.setItem('notes', JSON.stringify(newValue));
  },
  { deep: true }
);

onMounted(() => {
  note_id.value = Number(localStorage.getItem('note_id'));
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
