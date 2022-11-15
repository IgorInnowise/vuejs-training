<script setup>
import ListCard from '../components/ListCard.vue';
import { useLists } from '../composables/lists.ts';

const { state, newList } = useLists();
</script>

<template>
  <div class="main-column">
    <ListCard v-for="list in state.lists" :key="list.id" :list="list" />
    <div class="row" @click="newList()">
      <div class="card">
        <h4>+ New</h4>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../css/lists-component.scss';
</style>
