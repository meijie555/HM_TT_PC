<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>粉丝管理</my-Breadcrumb>
      </div>
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fansList">
          <div class="fans_list">
            <div class="fans_item" v-for="item of fans" :key="item.id.toString()">
              <!-- 头像 -->
               <el-avatar :size="80" :src="item.photo"></el-avatar>
              <!-- 用户名 -->
              <p>{{item.name}}</p>
              <!-- 关注 -->
              <el-button type='primary' plain size="small">+关注</el-button>
            </div>
          </div>
           <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansPhoto">粉丝画像</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import circleUrl from '../../assets/avatar.jpg'
export default {
  data () {
    return {
      activeName: 'fansList',
      // 默认头像
      circleUrl,
      fans: [],
      reqParams: {
        page: 1,
        per_page: 21
      },
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  methods: {
    async getFansList () {
      const { data: { data } } = await this.$axios.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 150px;
  height: 190px;
  border: 1px dashed #ddd;
  display: inline-block;
  padding-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  text-align: center;
}
</style>
