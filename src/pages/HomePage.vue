<template>
  <div id="main-wrapper">
    <div id="title">List of notes</div>
    <div id="set-default-wrapper">
      <button @click="setDefaultValues(default_note_ids)">
        Set Default Values
      </button>
    </div>
    <div>
      <input v-model="new_name_note" />
      <button @click="addNote()">Add</button>
    </div>
    <div id="notes-wrapper">
      <div v-for="(note, index) in notes" :key="index" class="note">
        <div class="note-wrapper">
          <span class="note-name">{{ note.name }}</span>
          <ul>
            <li v-for="(todo, index_2) in note.todos" :key="index_2">
              <span>{{ todo.name }}</span>
            </li>
          </ul>
        </div>
        <div class="button-delete-wrapper">
          <button @click="openPopupForDelete(index)">Edit</button>
        </div>
        <div class="button-delete-wrapper">
          <button @click="openPopupForDelete(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <Modal></Modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';

import modal from './../components/Modal.vue';

interface someArray {
  [key: string]: string;
}

interface someObject {
  [key: string]: string | [];
}

export default defineComponent({
  components: { modal },
  setup() {
    const open_modal = ref(false);
    const new_name_note = ref('');
    const delete_index = ref(0);
    const last_key = ref('1');
    const auto_increment = computed(
      () => parseInt(last_key.value.match(/\d+/)) + 1
    );
    const default_note_ids = ref([
      { id: 'note_1' },
      { id: 'note_2' },
      { id: 'note_3' },
    ]);
    const defaultNotes = ref([
      {
        note_1: {
          id: 'note_1',
          name: 'Note 1',
          todo_ids: [{ id: 'todo_1' }, { id: 'todo_2' }, { id: 'todo_3' }],
        },
      },
      {
        note_2: {
          id: 'note_2',
          name: 'Note 2',
          todo_ids: [{ id: 'todo_4' }, { id: 'todo_5' }, { id: 'todo_6' }],
        },
      },
      {
        note_3: {
          id: 'note_3',
          name: 'Note 3',
          todo_ids: [{ id: 'todo_7' }, { id: 'todo_8' }, { id: 'todo_9' }],
        },
      },
    ]);
    const defaultTodos = ref([
      { todo_1: { id: 'todo_1', name: 'Todo 1', check: true } },
      { todo_2: { id: 'todo_2', name: 'Todo 2', check: true } },
      { todo_3: { id: 'todo_3', name: 'Todo 3', check: false } },
      { todo_4: { id: 'todo_4', name: 'Todo 4', check: true } },
      { todo_5: { id: 'todo_5', name: 'Todo 5', check: false } },
      { todo_6: { id: 'todo_6', name: 'Todo 6', check: true } },
      { todo_7: { id: 'todo_7', name: 'Todo 7', check: false } },
      { todo_8: { id: 'todo_8', name: 'Todo 8', check: true } },
      { todo_9: { id: 'todo_9', name: 'Todo 9', check: true } },
    ]);
    const note_ids = ref([]);
    const notes = ref([{ name: 'Note 1' }]);
    onMounted(() => {
      getNotes();
    });
    const openPopupForDelete = (index: any) => {
      open_modal.value = true;
      delete_index.value = index;
    };
    const addNote = () => {
      if (new_name_note.value !== '') {
        last_key.value = 'note_' + auto_increment.value;
        setToLocalStorage(last_key.value, {
          id: last_key.value,
          name: new_name_note.value,
          todo_ids: [],
        });
        note_ids.value.push({ id: last_key.value });
        updateNotes(note_ids.value);
        new_name_note.value = '';
      }
    };
    const deleteNote = (index: any) => {
      Object.entries(note_ids.value).forEach((entry) => {
        const [key, value] = entry;
        if (key == index) {
          localStorage.removeItem(value.id);
        }
      });
      note_ids.value.splice(index, 1);
      notes.value.splice(index, 1);
      setToLocalStorage('notes', note_ids.value);
      open_modal.value = false;
    };
    const updateNotes = (values: someArray[]) => {
      setToLocalStorage('notes', values);
      getNotes();
    };
    const setDefaultValues = (values: someArray[]) => {
      defaultNotes.value.forEach((element, item) => {
        Object.entries(element).forEach((entry) => {
          const [key, value] = entry;
          setToLocalStorage(key, value);
        });
      });
      defaultTodos.value.forEach((element, item) => {
        Object.entries(element).forEach((entry) => {
          const [key, value] = entry;
          setToLocalStorage(key, value);
        });
      });
      updateNotes(values);
    };
    const getNotes = () => {
      note_ids.value = getFromLocalStorage('notes');
      notes.value = [];
      let todos: any[] = [];
      Object.entries(note_ids.value).forEach((entry) => {
        const [key, value] = entry;
        todos = [];
        let note = getFromLocalStorage(value.id);
        Object.entries(note.todo_ids).forEach((entry) => {
          const [key, value] = entry;
          let note = getFromLocalStorage(value.id);
          todos.push(note);
        });
        note.todos = todos;
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
      new_name_note,
      notes,
      note_ids,
      default_note_ids,
      open_modal,
      delete_index,
      deleteNote,
      addNote,
      setDefaultValues,
      openPopupForDelete,
    };
  },
});
</script>
