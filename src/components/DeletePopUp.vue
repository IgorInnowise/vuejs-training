<script setup>
import { ref } from 'vue';
import { router } from '../router/index.ts';
import { useLists } from '../composables/lists.ts';

const { deleteList, saveChanges, getListIndexById } = useLists();

const props = defineProps({
  listId: {
    type: Number,
    default: 0,
  },
});
const list_index = getListIndexById(props.listId);

function deleteConfirmed() {
  deleteList(list_index);
  saveChanges();
  router.push('/lists');
}

const pop_up_opened = ref(false);
function togglePopUp() {
  pop_up_opened.value = !pop_up_opened.value;
}
</script>

<template>
  <button class="btn" @click="togglePopUp">Delete</button>
  <!-- Delete Modal START -->
  <Teleport to="body">
    <div v-if="pop_up_opened" class="modal-pop-up">
      <p>Sure?</p>
      <button
        class="btn"
        @click="deleteConfirmed"
        @keyup.enter="deleteConfirmed"
      >
        Delete
      </button>
      <button class="btn" @click="togglePopUp" @keyup.esc="togglePopUp">
        Cancel
      </button>
    </div>
  </Teleport>
  <!-- Delete Modal END -->
</template>
