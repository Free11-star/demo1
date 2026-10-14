<template>
  <section class="registration-list">
    <div class="header">
      <h2>报名记录</h2>
      <div>
        <el-button type="primary" @click="openModal">立即报名</el-button>
      </div>
    </div>

    <el-empty v-if="total === 0" description="暂无报名记录">
      <el-button type="primary" @click="openModal">去报名</el-button>
    </el-empty>

    <el-table v-else :data="items" style="width:100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="studentId" label="学号" />
      <el-table-column prop="activity" label="活动" />
      <el-table-column label="组队">
        <template #default="{ row }">{{ row.needsTeam ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="时间">
        <template #default="{ row }">{{ formatTime(row.time) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template #default="{ row }">
          <el-button type="danger" size="small" @click="onDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pager" v-if="total > pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        v-model:current-page="page"
        :total="total"
        @current-change="refresh"
      />
    </div>

    <RegistrationModal v-model:visible="showModal" @added="onAdded" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import * as store from '../store/registrations';
import RegistrationModal from './RegistrationModal.vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const page = ref(1);
const pageSize = 5;
const showModal = ref(false);

const total = computed(() => store.total());
const items = computed(() => store.list(page.value, pageSize));

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function openModal() {
  showModal.value = true;
}

function onAdded() {
  page.value = 1; // jump to first page to show latest
}

function refresh(p) {
  page.value = p;
}

function onDelete(id) {
  ElMessageBox.confirm('确认删除此报名记录吗？', '提示')
    .then(() => {
      store.remove(id);
      ElMessage.success('已删除');
      if ((page.value - 1) * pageSize >= store.total() && page.value > 1) page.value = page.value - 1;
    })
    .catch(() => {});
}
</script>

<style scoped>
.registration-list {
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.pager { text-align: right; margin-top: 12px; }
</style>
