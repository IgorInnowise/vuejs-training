<script setup>
import { useLists } from '../composables/lists.ts';
import { router } from '../router/index.ts';

const { saveChanges, deleteList, getListIndexById } = useLists();

// TODO: Refactor.
const delete_text = 'Delete';

// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['id', 'title', 'content']);

// TODO: Move to enum file.
const max_lines_number = 3;
const lines = props.content.slice(0, max_lines_number);

function deleteConfirmed() {
  deleteList(getListIndexById(props.id));
  saveChanges();
  router.push('/lists');
}
</script>

<template>
  <div class="row">
    <router-link
      class="row-link"
      :to="{ name: 'list', params: { id: props.id } }"
    >
      <div class="card">
        <h4>{{ props.title }}</h4>
        <ul>
          <div v-if="props.content.length > 0">
            <li v-for="(line, index) in lines" :key="index">
              {{ line.text }}
            </li>
            <div v-if="props.content.length > max_lines_number">...</div>
          </div>
        </ul>
      </div>
    </router-link>
    <confirm-button
      :text="delete_text"
      @onClick="deleteConfirmed"
    ></confirm-button>
    <delete-pop-up-component :list_id="props.id"></delete-pop-up-component>
  </div>
</template>
