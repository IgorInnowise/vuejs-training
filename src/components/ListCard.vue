<script setup>
import ConfirmButton from '../components/ConfirmButton.vue';
import { Lists } from '../enum/lists.ts';
import { ButtonsName } from '../enum/buttons.ts';

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

const emit = defineEmits(['deleteList']);
const deleteList = () => {
  emit('deleteList', props.id);
};
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
            <div v-if="props.content.length > Lists.MAX_LINES_NUMBER">...</div>
          </div>
        </ul>
      </div>
    </router-link>
    <confirm-button
      :button-name="ButtonsName.DELETE"
      @on-confirm="deleteList"
    ></confirm-button>
  </div>
</template>
