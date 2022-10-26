<script setup>
import { ref } from 'vue';
import { getMaxId } from '../js/list.js';

const lists = ref(JSON.parse(localStorage.getItem('lists')) ?? []);

function newList() {
  lists.value.push({
    id: getMaxId(lists.value) + 1,
    title: 'New list',
    content: [],
  });
  localStorage.setItem('lists', JSON.stringify(lists.value));
}
</script>

<template>
  <div class="main-column">
    <list-card-component
      v-for="list in lists"
      :id="list.id"
      :key="list.id"
      :title="list.title"
      :content="list.content"
    ></list-card-component>
    <div class="row" @click="newList">
      <div class="card">
        <h4>+ New</h4>
      </div>
    </div>
  </div>
</template>
