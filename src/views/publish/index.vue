<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>发布文章</my-Breadcrumb>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">fuwenben</el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
            <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        title: null,
        cover: {
          type: 1
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
