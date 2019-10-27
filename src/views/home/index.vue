<template>
  <el-container class="home-container">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 图标 -->
        <span class="icon el-icon-s-fold"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/avatar.jpg" alt class="headIcon" />
            <span class="userName">用户名</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      .headIcon {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 50%;
      }
      .userName {
        vertical-align: middle;
        margin-left: 5px;
        font-weight: 700;
      }
    }
  }
}
</style>
