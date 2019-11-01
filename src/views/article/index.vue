<template>
  <div class="container">
    <!-- 筛选条件-->
    <el-card class="box-card">
      <div slot="header">
        <my-Breadcrumb>内容管理</my-Breadcrumb>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="valueArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果-->
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 0 条结果：</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题" prop='title'></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="发布时间" prop='pubdate'></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdata: null,
        end_pubdata: null
      },
      channelOptions: [],
      valueArr: [],
      articles: []
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 频道数据获取
    async getChannelOptions () {
      const { data: { data } } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      const { data: { data } } = await this.$axios.get('articles', { params: this.reqParams })
      this.articles = data.results
    }
  }
}
</script>

<style scoped lang='less'>
</style>
