<template>
  <!-- 全屏容器 -->
  <div class="container">
    <!-- 卡片容器  element-ui中的组件-->
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form :model="Loginform" :rules="LoginRules" status-icon ref="loginform">
        <el-form-item prop="mobile">
          <el-input v-model="Loginform.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="Loginform.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    // 自定义校验手机号
    const checkMoblie = (rules, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      Loginform: { mobile: '', code: '' },
      // 校验规则
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMoblie, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 整体校验
    login () {
      this.$refs['loginform'].validate(valid => {
        if (valid) {
          this.$axios
            .post('authorizations', this.Loginform)
            .then(res => {
              // 保存token  res 是响应对象  res.data 是响应主体
              local.setUser(res.data.data)
              // 跳转页面
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('错了哦，这是一条错误消息')
            })
        }
      })
    }
  }
}
</script>

<style  scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
