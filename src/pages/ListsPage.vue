<script setup>
import { useLists } from '../composables/lists.ts';

const { lists, newList, saveChanges, deleteList, getListIndexById } =
  useLists();

const deleteListConfirmed = (list_id) => {
  deleteList(getListIndexById(list_id));
  saveChanges();
};
</script>

<template>
  <div class="main-column">
    <list-card-component
      v-for="list in lists"
      :id="list.id"
      :key="list.id"
      :title="list.title"
      :content="list.content"
      @delete-list="deleteListConfirmed"
    ></list-card-component>
    <div class="row" @click="newList">
      <div class="card">
        <h4>+ New</h4>
      </div>
    </div>
  </div>
</template>
