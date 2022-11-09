<script setup>
import { ref } from 'vue';
import ModalPopUp from '../components/ModalPopUp.vue';

const emit = defineEmits(['onConfirm']);
const props = defineProps({
  btnName: {
    type: String,
    default: 'Confirm',
  },
  btnClass: {
    type: String,
    default: '',
  },
});
const isOpened = ref(false);

const confirmClick = (e) => {
  emit('onConfirm', e);
  isOpened.value = false;
};
</script>

<template>
  <button :class="$attrs.class" @click="isOpened = true">
    {{ props.btnName }}
  </button>
  <!-- Modal START -->
  <modal-pop-up :is-opened="isOpened">
    <template #Text>Sure?</template>
    <template #Buttons>
      <button class="btn" @click="confirmClick">Yes</button>
      <button class="btn" @click="isOpened = false">Cancel</button>
    </template>
  </modal-pop-up>
  <!-- Modal END -->
</template>
