<script setup>
import { useLists } from '../composables/lists.ts';

const { state } = useLists();
</script>

<template>
  <div class="topnav">
    <router-link class="main" :to="{ name: 'lists' }">Lists</router-link>
    <router-link
      v-for="list in state.lists"
      :key="list.id"
      class="list-button"
      :to="{ name: 'list', params: { id: list.id } }"
      >{{ list.title }}</router-link
    >
  </div>
</template>
