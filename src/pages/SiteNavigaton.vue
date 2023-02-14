<template>
  <header class="sticky top-0 bg-todo-black shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-4"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center pl-5 gap-3 cursor-pointer">
          <i class="fa-solid fa-lemon text-2xl"></i>
          <p class="text-2xl">The Notes App</p>
        </div>
      </RouterLink>
      <div class="flex items-center flex-1 justify-end">
        <div
          class="flex gap-3 px-6 py-1 hover:text-black hover:bg-stone-100 duration-150 rounded-full cursor-pointer"
        >
          <i
            class="fa-solid fa-pen-to-square text-xl"
            @click="toggleCreateModal"
          ></i>
          <p class="text-xl" @click="toggleCreateModal">Create note</p>
        </div>
      </div>
      <CreateNoteModal
        :modal-active="createModalActive"
        @cancel-creating="toggleCreateModal"
        @submit-creating="toggleCreateModal"
      ></CreateNoteModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CreateNoteModal from './CreateNoteModal.vue';

const createModalActive = ref(false);
const toggleCreateModal = () => {
  createModalActive.value = !createModalActive.value;
};
</script>

<style scoped></style>
