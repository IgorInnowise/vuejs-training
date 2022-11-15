<script setup>
import ConfirmButton from '../components/ConfirmButton.vue';
import { ListsEnum } from '../enum/lists-enum.ts';
import { ButtonsNameEnum } from '../enum/buttons-enum.ts';
import { useLists } from '../composables/lists.ts';

const { deleteList } = useLists();

const props = defineProps({
  list: {
    type: Object,
    default: () => Object,
  },
});

const lines = props.list.content.slice(0, ListsEnum.MAX_LINES_NUMBER);
</script>

<template>
  <div class="row">
    <router-link
      class="row-link"
      :to="{ name: 'list', params: { id: props.list.id } }"
    >
      <div class="card">
        <h4>{{ props.list.title }}</h4>
        <ul>
          <div v-if="props.list.content.length > 0">
            <li v-for="(line, index) in lines" :key="index">
              {{ line.text }}
            </li>
            <div v-if="props.list.content.length > ListsEnum.MAX_LINES_NUMBER">
              ...
            </div>
          </div>
        </ul>
      </div>
    </router-link>
    <confirm-button
      :btn-name="ButtonsNameEnum.DELETE"
      class="btn"
      @on-confirm="deleteList(props.list.id)"
    ></confirm-button>
  </div>
</template>
