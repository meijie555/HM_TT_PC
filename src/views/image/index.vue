<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>素材管理</my-Breadcrumb>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" size="small" @click="open">添加素材</el-button>
      </div>
      <!-- 素材  -->
      <div class="imgList">
        <div class="imgItem" v-for="item of images" :key="item.id">
          <img :src="item.url" />
          <div class="imgIcon" v-show="!reqParams.collect">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="delImg(item.id)"></span>
          </div>
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
    </el-card>
    <!-- 上传 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    async getImage () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页
    pager (newpage) {
      this.reqParams.page = newpage
      this.getImage()
    },
    // 全部与收藏切换
    toggleList () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 是否收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$axios.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
    },
    // 删除素材
    delImg (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getImage()
        })
        .catch(() => {
          // 取消操作
        })
    },
    handleSuccess (res) {
      // console.log(res)
      // 预览
      this.imageUrl = res.data.url
      this.$message.success('添加成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImage()
      }, 2000)
    },
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  }
}
</script>

<style scoped lang='less'>
.imgList {
  margin-top: 20px;
  .imgItem {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .imgIcon {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
