<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  ArrowLeft,
  Delete,
  Edit,
  Plus,
  Search,
  User
} from '@element-plus/icons-vue'

const keyword = ref('')
const nextId = ref(4)
const items = ref([
  { id: 1, name: '个人主页' },
  { id: 2, name: '项目展示页' },
  { id: 3, name: '后台管理页' }
])

const filteredItems = computed(() => {
  const text = keyword.value.trim()
  if (!text) return items.value

  return items.value.filter((item) => item.name.includes(text))
})

function addItem() {
  const id = nextId.value++
  items.value.push({ id, name: `新项目 ${id}` })
  ElMessage.success('项目已新增')
}

function editItem(item) {
  const name = window.prompt('请输入新的项目名称', item.name)
  if (name === null) return

  const trimmedName = name.trim()
  if (!trimmedName) {
    ElMessage.warning('项目名称不能为空')
    return
  }

  item.name = trimmedName
  ElMessage.success('项目名称已更新')
}

function deleteItem(item) {
  if (!window.confirm(`确定删除“${item.name}”吗？`)) return

  items.value = items.value.filter((current) => current.id !== item.id)
  ElMessage.success('项目已删除')
}
</script>

<template>
  <section class="icon-demo">
    <header class="page-heading">
      <el-icon class="heading-icon" aria-hidden="true">
        <User />
      </el-icon>
      <div>
        <h1>Element Plus 图标示例</h1>
        <p>图标可以搭配输入框、按钮和列表操作使用。</p>
      </div>
    </header>

    <div class="toolbar">
      <el-input
        v-model="keyword"
        clearable
        placeholder="搜索项目"
        class="search-input"
      >
        <template #prefix>
          <el-icon aria-hidden="true"><Search /></el-icon>
        </template>
      </el-input>

      <el-button type="primary" @click="addItem">
        <el-icon aria-hidden="true"><Plus /></el-icon>
        <span>新增项目</span>
      </el-button>

      <el-button :disabled="!keyword" @click="keyword = ''">
        <el-icon aria-hidden="true"><ArrowLeft /></el-icon>
        <span>清空搜索</span>
      </el-button>
    </div>

    <el-empty v-if="filteredItems.length === 0" description="没有找到项目" />

    <ul v-else class="project-list">
      <li v-for="item in filteredItems" :key="item.id" class="project-item">
        <span>{{ item.name }}</span>

        <div class="item-actions">
          <el-button
            type="primary"
            link
            :icon="Edit"
            @click="editItem(item)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            link
            :icon="Delete"
            @click="deleteItem(item)"
          >
            删除
          </el-button>
        </div>
      </li>
    </ul>

    <footer class="icon-samples" aria-label="图标大小和颜色示例">
      <span>
        <el-icon :size="20" color="#409eff" aria-hidden="true">
          <Search />
        </el-icon>
        搜索图标
      </span>
      <span>
        <el-icon :size="20" color="#67c23a" aria-hidden="true">
          <Plus />
        </el-icon>
        新增图标
      </span>
      <span>
        <el-icon :size="20" color="#f56c6c" aria-hidden="true">
          <Delete />
        </el-icon>
        删除图标
      </span>
    </footer>
  </section>
</template>
