<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>评论管理</my-Breadcrumb>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="标题" width="400px" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常' : '关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const {
        data: { data }
      } = await this.$axios.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    // 分页函数
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getComments()
    },
    // 切换 按钮状态
    toggleStatus (row) {
      const text = row.comment_status ? '确定要关闭评论吗' : '确定要打开评论吗'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发送修改请求
          const {
            data: { data }
          } = await this.$axios.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          // 请求成功后
          this.$message.success(
            data.allow_comment ? '打开评论成功' : '关闭评论成功'
          )
          // 更新操作状态
          row.comment_status = data.allow_comment
        })
        .catch(() => {
          // 取消操作
        })
    }
  }
}
</script>

<style scoped lang='less'>
</style>
