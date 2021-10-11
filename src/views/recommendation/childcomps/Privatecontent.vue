<template>
<div class="private">
  <div class="private_title">独家放送</div>
  <div class="private_content">
    <div class="private_item" v-for="(item,index) in privateList" :key="item.id">
      <div class="private_image">
        <img :src="item.picUrl" alt="">
      </div>
      <div class="private_text">{{item.copywriter}}</div>
    </div>
  </div>
</div>
</template>

<script setup>
import {defineProps} from "vue";
defineProps({
  privateList:Array
})
</script>

<style lang="scss" scoped>
.private {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  .private_title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .private_content {
    display: flex;
    justify-content: space-between;
    .private_item {
      display: flex;
      flex-direction: column;
      height: 200px;
      width: 380px;
      .private_image {
        width: 100%;
        height: 150px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .private_text {
        font-size: 16px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>