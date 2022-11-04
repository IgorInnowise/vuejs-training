<script setup>
import { ref } from 'vue';
import ModalPopUp from '../components/ModalPopUp.vue';

const emit = defineEmits(['onConfirm']);
const props = defineProps({
  buttonName: {
    type: String,
    default: 'Confirm',
  },
});
const is_opened = ref(false);

const confirmClick = (e) => {
  emit('onConfirm', e);
  is_opened.value = false;
};
</script>

<template>
  <button class="btn" @click="is_opened = true">
    {{ props.buttonName }}
  </button>
  <!-- Modal START -->
  <modal-pop-up :is-opened="is_opened">
    <template #Text>Sure?</template>
    <template #Buttons>
      <button class="btn" @click="confirmClick">
        {{ props.buttonName }}
      </button>
      <button class="btn" @click="is_opened = false">Cancel</button>
    </template>
  </modal-pop-up>
  <!-- Modal END -->
</template>
