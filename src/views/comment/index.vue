<template>
  <div class='container'>
    <el-card>
      <div slot="header">
        <my-Breadcrumb>评论管理</my-Breadcrumb>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="标题" width="400px"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
      <!-- 分页 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
