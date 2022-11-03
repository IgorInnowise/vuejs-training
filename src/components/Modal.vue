<template>
  <Teleport to="body">
    <div v-if="open_modal" class="modal">
      <div>
        <p>Delete this note?</p>
        <button class="answer-yes" @click="deleteNote(delete_index)">
          Yes
        </button>
        <button @click="open_modal = false">No</button>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'modalForPage',
};
</script>
