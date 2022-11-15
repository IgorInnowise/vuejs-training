<script setup>
import Navbar from '../components/NavBar.vue';
import { useLists } from '../composables/lists.ts';

const { saveChanges, deleteList, getListIndexById } = useLists();

const deleteListConfirmed = (list_id) => {
  deleteList(getListIndexById(list_id));
  saveChanges();
};
</script>

<template>
  <Navbar />
  <router-view @delete-list="deleteListConfirmed" />
</template>
