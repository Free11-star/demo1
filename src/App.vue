<script setup>
import IconDemo from './components/IconDemo.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import RegistrationList from './components/RegistrationList.vue'
import RegistrationTimeline from './components/RegistrationTimeline.vue'
</script>

<template>
  <main class="app" style="display:flex;gap:24px;align-items:flex-start">
    <section style="flex:1">
      <IconDemo />
      <!-- 保留内联表单作为示例 -->
      <RegistrationForm />
      <!-- 报名记录与弹窗 -->
      <RegistrationList />
    </section>

    <aside style="width:320px">
      <RegistrationTimeline />
    </aside>
  </main>
</template>
