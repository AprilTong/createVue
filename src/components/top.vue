<template>
  <div class="top fix">
    <h1>广告投放平台</h1>
    <div class="top_box fix">
      <el-menu
        :default-active="$route.fullPath.split('/')[1]"
        mode="horizontal"
        router
        active-text-color="#409EFF"
        text-color="#333"
      >
        <el-menu-item index="enterprise" :route="{ path: '/one' }"
          >首页</el-menu-item
        >
        <el-menu-item index="member" :route="{ path: '/promote' }"
          >推广</el-menu-item
        >
        <el-menu-item index="customer" :route="{ path: '/report' }"
          >报表</el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less">
.top {
  box-shadow: 0px 2px 5px 0px #d9d9d9;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 70px;
  line-height: 70px;
  overflow: hidden;
  h1 {
    float: left;
    width: 250px;
    height: 70px;
    font-size: 22px;
    text-align: center;
    color: #fff;
    background-color: #0077ff;
  }
  &_box {
    margin-left: 250px;
    padding: 0 20px;
    .el-menu {
      float: left;
    }
    .el-menu--horizontal > .el-menu-item {
      height: 70px;
      line-height: 70px;
      padding: 0;
      margin: 0 20px;
      display: inline-block;
    }
  }
  &_info {
    float: right;
    i {
      margin-left: 40px;
    }
    a {
      color: #333;
    }
  }
}
</style>
