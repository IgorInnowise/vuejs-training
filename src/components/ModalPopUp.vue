<script setup>
const props = defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Teleport to="body">
    <div v-if="props.isOpened" class="modal-pop-up">
      <p><slot name="Text"></slot></p>
      <slot name="Buttons"></slot>
    </div>
  </Teleport>
</template>
