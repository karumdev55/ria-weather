<template>
  <div class="tabs">
    <button
      v-for="city in cities"
      :key="city"
      @click="$emit('select', city)"
      :class="['tab', selected === city ? 'active' : '']"
    >
      {{ city.toUpperCase() }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({ cities: Array, selected: String });
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
}
.tab {
  flex: 1;
  padding: 12px 0;
  font-weight: 600;
  background: none;
  border: none;
  color: #555;
}
.active {
  border-bottom: 3px solid red;
  color: red;
}
</style>
