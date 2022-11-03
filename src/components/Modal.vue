<template>
  <Teleport to="body">
    <div v-if="isShowModal" class="modal">
      <slot name="body"></slot>
      <slot name="buttons"></slot>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalWindow',
  props: {
    isShowModal: Boolean,
  },
});
</script>
