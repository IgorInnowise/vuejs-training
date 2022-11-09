<script setup>
const props = defineProps({
  lists: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="topnav">
    <router-link class="main" :to="{ name: 'lists' }">Lists</router-link>
    <router-link
      v-for="list in props.lists"
      :key="list.id"
      class="list-button"
      :to="{ name: 'list', params: { id: list.id } }"
      >{{ list.title }}</router-link
    >
  </div>
</template>
