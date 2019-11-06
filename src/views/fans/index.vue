<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>粉丝管理</my-Breadcrumb>
      </div>
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fansList">粉丝列表</el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansPhoto">粉丝画像</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'fansList'
    }
  }
}
</script>

<style scoped lang='less'>
</style>
