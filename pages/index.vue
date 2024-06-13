<script setup lang="ts">
import dayjs from 'dayjs'
import type {Result} from "~/types";
import { watch} from "vue";

const duration = ref(30)
const items = ref<any[]>([])
const column = [
  {key: 'stationName', label: 'Tên trạm'},
  {key: 'reason', label: 'Lý do'},
  {key: 'time', label: 'Thời gian'},
]
const ui = {
  td: {
    base: ''
  }
}

onMounted(() => {
  getData()
})
const getDate = () => {
  const startDate = dayjs(new Date())
  return {
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: startDate.add(duration.value, 'day').format('YYYY-MM-DD')
  }
}

watch(duration, () => {
  getData()
})

const getData = async () => {
  const {data} = await useFetch<{ items: Result[] }>('/api/power', {
    method: 'POST',
    body: JSON.stringify({
      ...getDate()
    }),
  })

  if (data.value?.items) {
    items.value = data.value?.items.map(i => ({
      stationName: i.stationName,
      reason: i.reason,
      time: `${i.fromDateStr} - ${i.toDateStr}`,
    }))
  }
}

const durationStr = () => {
  const {startDate, endDate} = getDate()

  return `${startDate} - ${endDate}`
}

</script>

<template>
  <UContainer class="py-5">
    <h1 class="text-2xl border-b border-b-gray-500 pb-1">Tra cứu lịch cắt điện</h1>
    <div class="flex gap-2 pt-5">
      <UButton @click="duration = 30" color="indigo">1 tháng</UButton>
      <UButton @click="duration = 60" color="teal">2 tháng</UButton>
      <UButton @click="duration = 90" color="lime">3 tháng</UButton>
    </div>
    <div class="pt-7" v-if="items.length">
      <h2 class="text-xl">Result</h2>
      <UTable :rows="items" :columns="column" :ui="ui" />
    </div>
    <p v-else class="pt-7 text-emerald-500">👍 Không có lịch cắt điện trong thời gian {{durationStr()}}</p>
  </UContainer>
</template>

<style scoped>

</style>
