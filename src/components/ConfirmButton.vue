<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onClick']);
const props = defineProps(['text']);

function handleClick(e) {
  emit('onClick', e);
}

const pop_up_opened = ref(false);
function togglePopUp() {
  pop_up_opened.value = !pop_up_opened.value;
}
</script>

<template>
  <button class="btn" @click="togglePopUp">{{ props.text }}</button>
  <!-- Delete Modal START -->
  <Teleport to="body">
    <div v-if="pop_up_opened" class="modal-pop-up">
      <p>Sure?</p>
      <button class="btn" @click="handleClick" @keyup.enter="handleClick">
        {{ props.text }}
      </button>
      <button class="btn" @click="togglePopUp" @keyup.esc="togglePopUp">
        Cancel
      </button>
    </div>
  </Teleport>
  <!-- Delete Modal END -->
</template>
