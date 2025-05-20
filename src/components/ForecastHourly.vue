<template>
  <div class="section">
    <h2>Next hours</h2>
    <div class="scroll">
      <div v-for="item in hourlyData" :key="item.dt" class="hour-card">
        <p>{{ Math.round(item.main.temp) }}°</p>
        <p class="blue">{{ item.pop * 100 }}%</p>
        <img :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" />
        <p>{{ formatHour(item.dt_txt) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ hourlyData: Array });

function formatHour(dt) {
  return new Date(dt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
</script>

<style scoped>
.section { margin-top: 24px; }
.scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}
.hour-card {
  min-width: 80px;
  text-align: center;
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.hour-card img {
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
}

.blue {
  color: #007bff;
  font-size: 0.85em;
}
</style>