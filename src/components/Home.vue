<template>
  <div>
      Home组件
      <el-button type="info" v-on:click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  data: function() {
      return {}
  },
  methods: {
      logout: function() {
          window.sessionStorage.clear();
          this.$router.push("/login")
      }
  }
}
</script>

<style lang="less" scoped>

</style>