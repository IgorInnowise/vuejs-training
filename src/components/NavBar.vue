<script setup>
import { useLists } from '../composables/lists.ts';
import { router } from '../router/index.ts';
import { useRoute } from 'vue-router';
import ModalPopUp from './ModalPopUp.vue';
import { computed, reactive } from 'vue';

const { state, listsHaveChanges, cancelChanges } = useLists();
const route = useRoute();

const navButtons = computed(() => {
  const homeButton = [
    { active: true, title: 'Lists', path: { name: 'lists' } },
  ];
  const listButtons = state.lists.map((list) => {
    return {
      active: list.id == route.params.id,
      title: list.title,
      path: { name: 'list', params: { id: list.id } },
    };
  });
  return homeButton.concat(listButtons);
});

const leaveModal = reactive({ isOpened: false, path: { name: 'lists' } });
const leaveConfirmed = () => {
  cancelChanges();
  leaveModal.isOpened = false;
  router.push(leaveModal.path);
};
const navClick = (path) => {
  if (listsHaveChanges()) {
    leaveModal.path = path;
    leaveModal.isOpened = true;
  } else {
    router.push(path);
  }
};
</script>

<template>
  <div class="topnav">
    <button
      v-for="(button, index) in navButtons"
      :key="index"
      class="list-button btn"
      :class="button.active ? 'active' : ''"
      @click="navClick(button.path)"
    >
      {{ button.title }}
    </button>
    <!-- Modal START -->
    <modal-pop-up :is-opened="leaveModal.isOpened">
      <template #Text
        >Do you really want to leave? you have unsaved changes!</template
      >
      <template #Buttons>
        <button class="btn" @click="leaveConfirmed">Yes</button>
        <button class="btn" @click="leaveModal.isOpened = false">Cancel</button>
      </template>
    </modal-pop-up>
    <!-- Modal END -->
  </div>
</template>
