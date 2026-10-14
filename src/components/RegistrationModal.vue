<template>
  <el-dialog v-model="visible" title="报名表单" width="520px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.studentId" placeholder="请输入学号" />
      </el-form-item>
      <el-form-item label="活动" prop="activity">
        <el-select v-model="form.activity" placeholder="请选择活动">
          <el-option label="前端挑战" value="前端挑战" />
          <el-option label="算法训练" value="算法训练" />
          <el-option label="设计竞赛" value="设计竞赛" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否需要组队" prop="needsTeam">
        <el-switch v-model="form.needsTeam" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onReset">重置</el-button>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import * as store from '../store/registrations';

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['update:visible', 'added']);

const formRef = ref(null);
const form = ref({ name: '', studentId: '', activity: '', needsTeam: false });

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
  studentId: [
    { required: true, message: '请输入学号', trigger: ['blur', 'change'] },
    { pattern: /^\d+$/, message: '学号只能包含数字', trigger: ['blur', 'change'] },
  ],
  activity: [{ required: true, message: '请选择活动', trigger: ['change'] }],
};

const visible = ref(props.visible);

watch(() => props.visible, v => {
  visible.value = v;
});

watch(visible, v => {
  emit('update:visible', v);
  if (!v) onReset();
});

function onReset() {
  formRef.value?.resetFields();
}

function onSubmit() {
  formRef.value?.validate(valid => {
    if (!valid) return;
    const rec = store.add({ ...form.value });
    ElMessage.success('报名成功');
    emit('added', rec);
    visible.value = false;
  });
}
</script>
