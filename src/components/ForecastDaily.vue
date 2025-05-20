<template>
  <div class="section">
    <h2>Next 5 days</h2>
    <div class="days">
      <div v-for="day in days" :key="day.date" class="day-row">
        <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" />
        <div class="text">
          <p>{{ day.date }}</p>
          <p class="desc">{{ day.desc }}</p>
        </div>
        <div class="temps">
          <span>{{ day.tempMax }}°</span>
          <span>{{ day.tempMin }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({ data: Array });

const days = computed(() => {
  const map = {};
  props.data.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!map[date] || item.dt_txt.includes('12:00:00')) {
      map[date] = {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        icon: item.weather[0].icon,
        desc: item.weather[0].description,
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
      };
    }
  });
  return Object.values(map).slice(0, 5);
});
</script>

<style scoped>
.days { margin-top: 12px; display: flex; flex-direction: column; gap: 12px; }
.day-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.text { flex: 1; text-align: center; }
.desc { font-size: 0.85em; color: gray; }
.temps span { margin-left: 10px; font-weight: bold; }
</style>