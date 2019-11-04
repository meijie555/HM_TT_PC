<template>
  <div class="my-image">
    <!-- 图片式按钮 -->
    <div class="btn_box" @click="open">
      <img src="../assets/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部与收藏按钮 -->
          <div class="btn">
            <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材  -->
          <div class="imgList">
            <div class="imgItem" v-for="item of images" :key="item.id">
              <img :src="item.url" />
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
        <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      dialogVisible: false,
      activeName: 'image',
      images: [],
      total: 0
    }
  },
  methods: {
    // 点击图片式按钮函数
    open () {
      this.dialogVisible = true
      this.getImage()
    },
    // 切换全部与收藏
    toggleList () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 获取素材
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
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}

.imgList {
  margin-top: 20px;
  .imgItem {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
