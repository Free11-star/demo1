<template>
  <aside class="timeline">
    <h3>最新报名（5 条）</h3>
    <el-timeline>
      <el-timeline-item
        v-for="item in items"
        :key="item.id"
        :timestamp="formatTime(item.time)"
      >
        <strong>{{ item.name }}</strong> 报名了 <em>{{ item.activity }}</em> 
        <div style="font-size:0.9em;color:var(--el-text-color-secondary)">是否组队: {{ item.needsTeam ? '是' : '否' }}</div>
      </el-timeline-item>
    </el-timeline>
    <div v-if="items.length === 0" class="empty-note">暂无记录</div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import * as store from '../store/registrations';

const items = computed(() => store.latest(5));

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}
</script>

<style scoped>
.timeline { margin-top: 20px; }
.empty-note { color: var(--el-text-color-secondary); margin-top: 8px; }
</style>