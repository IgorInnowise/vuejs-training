<script setup>
import { useLists } from '../composables/lists.ts';
import { router } from '../router/index.ts';
import ConfirmButton from '../components/ConfirmButton.vue';
import { Lists } from '../enum/lists.ts';
import { ButtonsName } from '../enum/buttons.ts';

const { saveChanges, deleteList, getListIndexById } = useLists();

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: 'New list',
  },
  content: {
    type: Array,
    default: () => [],
  },
});

const lines = props.content.slice(0, Lists.MAX_LINES_NUMBER);

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
      :text="ButtonsName.DELETE"
      @on-click="deleteConfirmed"
    ></confirm-button>
    <!-- <delete-pop-up-component :listId="props.id"></delete-pop-up-component> -->
  </div>
</template>
