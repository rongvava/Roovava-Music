<template>
<div class="newsong">
  <div class="newsong_title">最新音乐</div>
  <div class="newsong_content">
    <div class="newsong_item" v-for="(item,index) in newSongsList" :key="item.id">
      <div class="newsong_index">{{index+1}}</div>
      <div class="newsong_box">
        <div class="newsong_image">
          <img :src="item.picUrl" alt="">
          <svg class="icon play" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
        <div class="newsong_info">
          <div class="newsong_name">{{ item.name }}</div>
          <div class="newsong_nickname">{{ item.song.album.company }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  newSongsList:Array
})
</script>

<style lang="scss" scoped>
.newsong {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  .newsong_title {
    font-size: 24px;
    font-weight: 700;
    padding: 20px 0;
    border-bottom: 1px solid #000000;
  }
  .newsong_content {
    display: flex;
    flex-wrap: wrap;
    .newsong_item {
      display: flex;
      align-items: center;
      width: 50%;
      height: 90px;
      padding: 10px 0;
      .newsong_index {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        font-size: 18px;
      }
      .newsong_box {
        display: flex;
        .newsong_image {
          position: relative;
          width: 65px;
          height: 65px;
          margin-right: 10px;
          cursor: pointer;
          .play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 24px;
            height: 24px;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .newsong_info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 18px;
        }
      }
    }
  }
}
</style>