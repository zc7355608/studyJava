// composables/usePagination.js
import { ref, watchEffect } from 'vue'

export function usePagination(fetchCallback, options = {}) {
  const {
    immediate = true,
    defaultPageSize = 10,
    defaultCurrentPage = 1
  } = options

  const currentPage = ref(defaultCurrentPage)
  const pageSize = ref(defaultPageSize)
  const total = ref(0)
  const loading = ref(false)

  const handleSizeChange = (size) => {
    pageSize.value = size
    currentPage.value = 1
  }

  const handleCurrentChange = (page) => {
    currentPage.value = page
  }

  const reset = () => {
    currentPage.value = defaultCurrentPage
    pageSize.value = defaultPageSize
    total.value = 0
  }

  watchEffect(async () => {
    if (loading.value) return
    
    loading.value = true
    try {
      await fetchCallback({
        page: currentPage.value,
        size: pageSize.value,
        totalRef: total  // 这里传递total的ref引用
      })
    } finally {
      loading.value = false
    }
  })

  return {
    currentPage,
    pageSize,
    total,
    loading,
    handleSizeChange,
    handleCurrentChange,
    reset
  }
}


==============

<template>
  <div>
    <el-table :data="tableData" :loading="loading">
      <!-- 表格内容 -->
    </el-table>
    
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :disabled="loading"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePagination } from '@/composables/usePagination'

const tableData = ref([])

const { 
  currentPage, 
  pageSize, 
  total, 
  loading,
  handleSizeChange, 
  handleCurrentChange 
} = usePagination(async ({ page, size, totalRef }) => {
  // 这里参数名正确了：page, size, totalRef
  const response = await api.getList({ page, size })
  
  // 处理空数据情况
  if (response.data.length === 0 && page > 1) {
    currentPage.value = 1
    return
  }
  
  tableData.value = response.data
  totalRef.value = response.total  // 使用totalRef来更新total
})
</script>