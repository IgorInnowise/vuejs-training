<script setup>
import { ref } from 'vue';

const emit = defineEmits(['onConfirm']);
const props = defineProps({
  text: {
    type: String,
    default: 'Confirm',
  },
});

const confirmClick = (e) => {
  emit('onConfirm', e);
};

const pop_up_opened = ref(false);
const togglePopUp = () => {
  pop_up_opened.value = !pop_up_opened.value;
};
</script>

<template>
  <button class="btn" @click="togglePopUp">{{ props.text }}</button>
  <!-- Confirm Modal START -->
  <Teleport to="body">
    <div v-if="pop_up_opened" class="modal-pop-up">
      <p>Sure?</p>
      <button class="btn" @click="confirmClick" @keyup.enter="confirmClick">
        {{ props.text }}
      </button>
      <button class="btn" @click="togglePopUp" @keyup.esc="togglePopUp">
        Cancel
      </button>
    </div>
  </Teleport>
  <!-- Confirm Modal END -->
</template>
