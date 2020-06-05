<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" v-on:click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside v-bind:width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" v-on:click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          v-bind:unique-opened="true"
          v-bind:collapse="isCollapse"
          v-bind:collapse-transition="false"
          v-bind:router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu v-bind:index="item.id + ''" v-for="item in menulist" v-bind:key="item.id">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i v-bind:class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item v-bind:index="'/' + subItem.path" v-for="subItem in item.children" v-bind:key="subItem.id">
              <!-- 二级菜单的模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "",
  data: function() {
    return {
        // 左侧菜单数据
        menulist: [],
        iconsObj: {
            "125": "iconfont icon-user",
            "103": "iconfont icon-tijikongjian",
            "101": "iconfont icon-shangpin",
            "102": "iconfont icon-danju",
            "145": "iconfont icon-baobiao",
        },
        // 是否折叠
        isCollapse: false,
    };
  },
  created: function() {
      this.getMenuList();
  },
  methods: {
    logout: function() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    // 获取所有的菜单
    async getMenuList() {
        const { data: res } = await this.$http.get("menus")
        // console.log(res)
        if(res.meta.status !==200) return this.$message.error(res.meta.msg);
        this.menulist = res.data;
    },

    // 点击按钮, 切换菜单的折叠与展开
    toggleCollapse: function() {
        this.isCollapse = !this.isCollapse
    }  
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
      border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background: #4A5064;
    color: #fff;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
