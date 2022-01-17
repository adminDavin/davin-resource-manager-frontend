<template>
    <div class="wscn-http404-container layout-container flex center">
      <div class="wscn-http404">
        <div class="pic-404">
          <img class="pic-404__parent" :src="first" alt="404" />
        </div>
        <div class="bullshit">
          <div class="bullshit__oops">无权限访问!</div>
          <div class="bullshit__info">
            您没有访问权限，如需权限，请联系上级授权！
          </div>
          <el-button @click="go" type="primary" round>跳转首页</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import first from "@/assets/images/401.gif"
  export default defineComponent({
    setup() {
      return {
        first
      }
    },
    methods: {
      go() {
        this.$router.push('/')
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  </style>