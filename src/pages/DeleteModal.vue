<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="pt-16 pb-16 bg-white self-start m-auto mt-64 max-w-md rounded-lg"
          >
            <p class="text-2xl text-center">Are you sure</p>
            <p class="text-2xl text-center">you want to delete this note?</p>
            <div class="flex justify-center mt-1">
              <div>
                <button
                  class="text-white mt-4 py-2 px-6 bg-neutral-500 border hover:bg-todo-black duration-150 rounded-full"
                  @click="handleDeleting"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  class="text-black mt-4 ml-4 py-2 px-6 bg-white border border-white hover:text-white hover:bg-todo-black duration-150 rounded-full"
                  @click="$emit('cancel-deleting')"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { notes, delete_id } from '../store/notes';

const emits = defineEmits(['cancel-deleting', 'submit-deleting']);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
const handleDeleting = () => {
  const index = notes.value.findIndex((n) => n.id == delete_id.value);
  notes.value.splice(index, 1);
  emits('submit-deleting');
};
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
