<template>
  <div class="nav">
    <div class="nav_box">
      <el-scrollbar>
        <el-menu class="nav_menu" :default-active="String($route.name)" router>
          <el-submenu index="1">
				<template slot="title">
					<span>导航一</span>
				</template>
				<el-menu-item-group>
					<template slot="title">分组一</template>
					<el-menu-item index="1-1" :route="{ path: '/one' }">选项1</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">选项4</template>
					<el-menu-item index="1-4-1">选项1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="2" :route="{ path: '/report' }">导航二</el-menu-item>
			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data: function() {
    return {
      info: ''
    }
  },
  created: function() {},
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less">
.nav {
  position: fixed;
  top: 70px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 250px;
  z-index: 1;
  &_box {
    height: 100%;
  }
  &_menu {
    border-right: 0 none;
    width: 250px;
    margin-top: 40px;
    .el-menu-item,
    .el-submenu__title {
      height: 42px;
      line-height: 42px;
    }
  }
  .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
