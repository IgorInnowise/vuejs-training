<script setup>
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['id', 'title', 'content']);

const max_lines_number = 3;
const lines = props.content.slice(0, max_lines_number);
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
  </div>
</template>
