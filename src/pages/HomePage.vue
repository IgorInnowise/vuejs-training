<template>
  <div id="main-wrapper">
    <div id="title">List of notes</div>
    <button @click="setValues(default_note_ids)">Set Default Values</button>
    <div id="notes-wrapper">
      <div v-for="(note, index) in notes" :key="index" class="note">
        <span class="note-name">{{ note.name }}</span>
        <button @click="handleDeleteClick(index)">Delete</button>
      </div>
      <input v-model="name" />
      <button @click="handleAddClick()">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

interface someArray {
  [key: string]: number;
}

interface someObject {
  [key: string]: string;
}

export default defineComponent({
  setup() {
    const name = ref('');
    const last_key = ref('1');
    const auto_increment = ref(0);
    const default_note_ids = ref([
      { id: 'note_1' },
      { id: 'note_2' },
      { id: 'note_3' },
      { id: 'note_4' },
      { id: 'note_5' },
    ]);
    const defaultNotes = ref([
      { note_1: { id: 'note_1', name: 'Note 1' } },
      { note_2: { id: 'note_2', name: 'Note 2' } },
      { note_3: { id: 'note_3', name: 'Note 3' } },
      { note_4: { id: 'note_4', name: 'Note 4' } },
      { note_5: { id: 'note_5', name: 'Note 5' } },
    ]);
    const note_ids = ref([]);
    const notes = ref([{ name: 'Note 1' }]);
    onMounted(() => {
      getNotes();
    });
    const handleAddClick = () => {
      if (name.value !== '') {
        auto_increment.value = parseInt(last_key.value.match(/\d+/)) + 1;
        last_key.value = 'note_' + auto_increment.value;
        setToLocalStorage(last_key.value, {
          id: last_key.value,
          name: name.value,
        });
        note_ids.value.push({ id: last_key.value });
        setValues(note_ids.value);
        name.value = '';
      }
    };
    const handleDeleteClick = (index: any) => {
      Object.entries(note_ids.value).forEach((entry) => {
        const [key, value] = entry;
        if (key == index) {
          localStorage.removeItem(value.id);
        }
      });
      note_ids.value.splice(index, 1);
      notes.value.splice(index, 1);
      setToLocalStorage('notes', note_ids.value);
    };
    const setValues = (values: someArray) => {
      setToLocalStorage('notes', values);
      defaultNotes.value.forEach((element, item) => {
        Object.entries(element).forEach((entry) => {
          const [key, value] = entry;
          setToLocalStorage(key, value);
        });
      });
      getNotes();
    };
    const getNotes = () => {
      note_ids.value = getFromLocalStorage('notes'); // JSON.parse(localStorage.getItem('notes') ?? '[]');
      notes.value = [];
      Object.entries(note_ids.value).forEach((entry) => {
        const [key, value] = entry;

        let note = getFromLocalStorage(value.id); //JSON.parse(localStorage.getItem(value.id) ?? '[]');
        notes.value.push(note);
        last_key.value = value.id;
      });
    };
    const getFromLocalStorage = (key: string) => {
      return JSON.parse(localStorage.getItem(key) ?? '[]');
    };
    const setToLocalStorage = (
      key: string,
      value: Array<someArray> | someObject
    ) => {
      return localStorage.setItem(key, JSON.stringify(value));
    };
    return {
      name,
      notes,
      handleDeleteClick,
      handleAddClick,
      note_ids,
      setValues,
      default_note_ids,
    };
  },
});
</script>
