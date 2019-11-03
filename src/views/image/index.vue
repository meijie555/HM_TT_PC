<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>素材管理</my-Breadcrumb>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" size="small">添加素材</el-button>
      </div>
      <!-- 素材  -->
      <div class="imgList">
        <div class="imgItem" v-for="item of images" :key="item.id">
          <img :src="item.url" />
          <div class="imgIcon">
            <span class="el-icon-star-off red"></span>
            <span class="el-icon-delete"></span>
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
        @current-change='pager'
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0
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
    pager (newpage) {
      this.reqParams.page = newpage
      this.getImage()
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
