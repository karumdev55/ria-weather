<template>
  <div class="container">
    <SearchBar @search="searchCity" />
    <Cities :cities="cities" :selected="selectedCity" @select="setCity" />
    <p v-if="error" class="error-message">{{ error }}</p>
    <button class="refresh" @click="loadData">Refresh</button>
    <ForecastHourly v-if="forecast" :hourlyData="forecast.list.slice(0, 6)" />
    <ForecastDaily v-if="forecast" :data="forecast.list" />
    <p class="updated">Last updated on {{ updatedAt }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cities from '../components/Cities.vue';
import SearchBar from '../components/SearchBar.vue';
import ForecastHourly from '../components/ForecastHourly.vue';
import ForecastDaily from '../components/ForecastDaily.vue';
import { getForecast } from '../services/weatherService.js';

const cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles'];
const selectedCity = ref(cities[0]);
const forecast = ref(null);
const updatedAt = ref('');
const error = ref('');

const setCity = (city) => {
  selectedCity.value = city;
  loadData();
};

const searchCity = (city) => {
  if (!city.trim()) {
    forecast.value = null;
    return;
  }
  selectedCity.value = city;
  loadData();
};

const loadData = async () => {
  const data = await getForecast(selectedCity.value);
  if (data && data.cod === "200") {
    forecast.value = data;
    updatedAt.value = new Date().toLocaleString();
    error.value = '';
  } else {
    forecast.value = null;
    error.value = data?.message || `City "${selectedCity.value}" not found.`;
  }
};

loadData();
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.refresh {
  margin: 10px 0;
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
.updated {
  font-size: 0.85em;
  color: gray;
  float: right;
}
.error-message {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}
</style>