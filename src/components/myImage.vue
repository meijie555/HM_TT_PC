<template>
  <div class="my-image">
    <!-- 图片式按钮 -->
    <div class="btn_box" @click="open">
      <img :src="value||defaultImage" alt />
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
            <div
              class="imgItem"
              v-for="item of images"
              :key="item.id"
              @click="selectedImage(item.url)"
              :class="{selected:selectedImageUrl===item.url}"
            >
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
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="uplocalImageUrl" :src="uplocalImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import defaultImage from '../assets/default.png'
export default {
  name: 'my-image',
  props: ['value'],
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
      total: 0,
      selectedImageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      uplocalImageUrl: null,
      defaultImage
    }
  },
  methods: {
    // 点击图片式按钮函数
    open () {
      this.dialogVisible = true
      this.getImage()
      // this.selectedImageUrl = null
      this.uplocalImageUrl = null
      this.activeName = 'image'
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
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    handleSuccess (res) {
      // console.log(res)
      // 预览
      this.uplocalImageUrl = res.data.url
      this.$message.success('添加成功')
    },
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择图片')
        }
        // this.defaultImage = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.uplocalImageUrl) {
          return this.$message.warning('请上传图片')
        }
        // this.defaultImage = this.uplocalImageUrl
        this.$emit('input', this.ulpocalImageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
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
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
</style>
