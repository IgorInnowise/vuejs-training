import { ref } from 'vue';

interface Note {
  id: number;
  name: string;
  todoList: Todo[];
  done: boolean;
}

export interface Todo {
  id: number;
  name: string;
  done: boolean;
  inputChange: boolean;
}
export const notes = ref<Note[]>([]);
export const delete_id = ref<number>(0);
