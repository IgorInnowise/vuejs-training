<script setup>
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['id', 'title', 'content']);

const max_lines_to_show = 3;
const lines_to_show = Math.min(props.content.length, max_lines_to_show);
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
            <li v-for="line_index in lines_to_show" :key="line_index">
              {{ props.content[line_index - 1].text }}
            </li>
            <div v-if="lines_to_show === max_lines_to_show">...</div>
          </div>
        </ul>
      </div>
    </router-link>
  </div>
</template>
