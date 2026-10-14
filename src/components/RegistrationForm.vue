<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Tickets } from '@element-plus/icons-vue'

const formRef = ref()
const registration = reactive({
  name: '',
  studentId: '',
  activity: '',
  needsTeam: ''
})
const submittedRegistration = ref(null)

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { whitespace: true, message: '姓名不能为空', trigger: 'blur' }
  ],
  studentId: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    {
      pattern: /^\d+$/,
      message: '学号请填写数字',
      trigger: 'blur'
    }
  ],
  activity: [{ required: true, message: '请选择报名活动', trigger: 'change' }]
}

function submitRegistration() {
  if (!formRef.value) return

  submittedRegistration.value = null
  formRef.value.validate((valid) => {
    if (!valid) return

    submittedRegistration.value = { ...registration }
    ElMessage.success('报名成功')
  })
}

function resetForm() {
  formRef.value?.resetFields()
  formRef.value?.clearValidate()
  submittedRegistration.value = null
}
</script>

<template>
  <section class="registration-card">
    <header class="registration-heading">
      <el-icon class="registration-icon" aria-hidden="true">
        <Tickets />
      </el-icon>
      <div>
        <h2>活动报名</h2>
        <p>请填写报名信息，带 * 的项目为必填项。</p>
      </div>
    </header>

    <el-form
      ref="formRef"
      :model="registration"
      :rules="rules"
      label-position="top"
      class="registration-form"
      @submit.prevent="submitRegistration"
    >
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="registration.name"
          placeholder="请输入姓名"
          maxlength="30"
          clearable
        />
      </el-form-item>

      <el-form-item label="学号" prop="studentId">
        <el-input
          v-model="registration.studentId"
          placeholder="请输入学号"
          inputmode="numeric"
          maxlength="20"
          clearable
        />
      </el-form-item>

      <el-form-item label="活动选择" prop="activity">
        <el-select
          v-model="registration.activity"
          placeholder="请选择要报名的活动"
          class="full-width"
        >
          <el-option label="前端技术分享" value="前端技术分享" />
          <el-option label="网页设计实践" value="网页设计实践" />
          <el-option label="团队项目挑战" value="团队项目挑战" />
        </el-select>
      </el-form-item>

      <el-form-item label="是否需要组队" prop="needsTeam">
        <el-radio-group v-model="registration.needsTeam">
          <el-radio value="yes">需要组队</el-radio>
          <el-radio value="no">不需要，个人参加</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="registration-actions">
        <el-button type="primary" native-type="submit">
          <el-icon aria-hidden="true"><Tickets /></el-icon>
          提交报名
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-form>

    <el-alert
      v-if="submittedRegistration"
      class="registration-result"
      type="success"
      :closable="false"
      show-icon
      title="报名信息已确认"
      :description="`${submittedRegistration.name}（${submittedRegistration.studentId}），活动：${submittedRegistration.activity}；${submittedRegistration.needsTeam === 'yes' ? '需要组队' : '个人参加'}`"
    />

    <p class="privacy-note">演示表单：提交信息仅显示在当前页面，不会上传或保存。</p>
  </section>
</template>
