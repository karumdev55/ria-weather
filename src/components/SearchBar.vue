<template>
  <div class="search">
    <div class="input-wrapper">
      <input
        v-model="query"
        @input="onInput"
        @keyup.enter="submit"
        placeholder="Search for a city..."
      />
      <button class="icon-button" @click="submit" title="Search">
        🔍
      </button>
    </div>

    <ul v-if="filteredCities.length" class="suggestions">
      <li v-for="city in filteredCities" :key="city.city_id" @click="select(city.city_name)">
        {{ city.city_name }}, {{ city.country_code }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import citiesData from '../assets/cities.json'; // Put the Weatherbit city list here

const emit = defineEmits(['search']);
const query = ref('');
const filteredCities = ref([]);
const cities = ref([]);

onMounted(() => {
  cities.value = citiesData;
});

const onInput = () => {
  const q = query.value.toLowerCase();
  if (q.length >= 2) {
    filteredCities.value = cities.value.filter((c) =>
      c.city_name.toLowerCase().startsWith(q)
    ).slice(0, 5);
  } else {
    filteredCities.value = [];
  }
};

const select = (cityName) => {
  query.value = cityName;
  submit();
};

const submit = () => {
  if (query.value.trim()) {
    emit('search', query.value.trim());
    filteredCities.value = [];
  }
};
</script>

<style scoped>
.search {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 20px 0;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #ccc;
  border-right: none;
}

.icon-button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: 1px solid #007bff;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.suggestions {
  position: absolute;
  top: 42px;
  z-index: 10;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
}

.suggestions li {
  padding: 6px 10px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f1f1f1;
}
</style>