<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>个人设置</my-Breadcrumb>
      </div>
      <!-- 栅格 -->
      <el-row>
        <!-- 表单 -->
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机号">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" rows="3" v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 上传头像 -->
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="updataPhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      }
      // imageUrl: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$axios.get('user/profile')
      // console.log(data)
      this.userInfo = data
    },
    // 保存设置 除了头像
    async saveInfo () {
      // patch  都是修改请求  局部修改
      // put 都是修改请求 完整修改
      await this.$axios.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })
      // 提示成功
      this.$message.success('保存成功')
      // 更新home组件  用户名
      eventBus.$emit('updataName', this.userInfo.name)
      // 更新本地存储 token
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    },
    // 修改头像
    async updataPhoto (result) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果（包含文件信息）
      console.log(result)
      // 1. 获取图片文件数据
      const file = result.file
      // 2. 创建一个formData
      const formData = new FormData()
      // 3. 追加图片数据到fromData  字段名字和后台一致
      formData.append('photo', file)
      // 4. 使用axios提交数据
      const { data: { data } } = await this.$axios.patch('user/photo', formData)
      // 5. 拿着上传成功后的地址进行预览
      this.userInfo.photo = data.photo
      // 提示成功
      this.$message.success('头像上传成功')
      // 7. 更新home组件的photo
      eventBus.$emit('updataPhoto', data.photo)
      // 8. 更新本地存储的photo
      const userPhoto = local.getUser()
      userPhoto.photo = data.photo
      local.setUser(userPhoto)
    }
  }
}
</script>

<style scoped lang='less'>
</style>
