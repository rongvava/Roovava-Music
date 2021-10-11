<template>
<div class="currentdetial">
  <div class="current_image">
    <img :src="songDetail.coverImgUrl" alt="">
  </div>
  <div class="current_info">
    <div class="current_title">
      <div class="title_name">歌单</div>
      <div class="title_songname">{{ songDetail.name }}</div>
    </div>
    <div class="current_time">
      <div class="time_image">
        <img :src="songDetail.creator.avatarUrl" alt="">
      </div>
      <div class="time_name">{{ songDetail.creator.nickname }}</div>
      <div class="time_setup">{{ timer }} <span>创建</span></div>
    </div>
    <div class="current_control">
      <div class="control_play">
        <svg class="icon play" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span>播放全部</span>
        <svg class="icon add" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
      </div>
      <div class="control_coll">
        <svg class="icon coll" aria-hidden="true">
          <use xlink:href="#icon-shoucangxinyuandanyuanwangqingdantuijian"></use>
        </svg>
        <span>收藏({{ songDetail.subscribedCount }})</span>
      </div>
      <div class="control_share">
        <svg class="icon share" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>分享({{ songDetail.shareCount }})</span>
      </div>
      <div class="control_down">
        <svg class="icon down" aria-hidden="true">
          <use xlink:href="#icon-xiazai-xianxing"></use>
        </svg>
        <span>下载全部</span>
      </div>
    </div>
    <div class="current_tag">
      <div class="tag_title">标签:</div>
      <div class="tag_item" v-for="(item,index) in songDetail.tags" :key="index">{{ item }}</div>
    </div>
    <div class="current_song">
      <div class="song_title">歌曲:</div>
      <div class="song_title song_count">{{ songDetail.trackCount }}</div>
      <div class="song_title song_play">播放:</div>
      <div class="song_title song_num">{{ songDetail.playCount }}</div>
    </div>
    <div class="current_intro">
      <div class="intro_name">
        简介:
      </div>
      <div class="intro_content">{{ songDetail.description }}</div>
    </div>
  </div>
</div>
</template>

<script setup>
import {dateChange} from 'common/Utils'
import {defineProps,computed,ref} from "vue";
import {getSongDetail} from "@/network/detail";
const props = defineProps({
  songDetail:Object
})
console.log(props.songDetail)
let timer = ref(null)
timer.value = dateChange(props.songDetail.createTime,'yy-mm-dd')
timer.value = timer.value.replace(/^\"|\"$/g,'')
</script>

<style lang="scss" scoped>
.currentdetial {
  display: flex;
  .current_image {
    width: 258px;
    height: 258px;
    margin-right: 40px;
    img{
      width: 258px;
      height: 258px;
    }
  }
  .current_info {
    .current_title {
      display: flex;
      align-items: center;
      .title_name {
        border: 2px solid #f28c8c;
        padding: 0 10px;
        font-size: 16px;
        font-weight: 700;
        color: #e83c3c;
        border-radius: 10px;
        margin-right: 10px;
      }
      .title_songname {
        font-size: 20px;
        font-weight: 700;
      }
    }
    .current_time {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .time_image {
        height: 40px;
        width: 40px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .time_name {
        color: #767db6;
        font-size: 14px;
        margin: 0 10px;
      }
      .time_setup {
        font-size: 16px;
        color: #676767;
      }
    }
    .current_control {
      display: flex;
      align-items: center;
      margin: 20px 0;
      .control_play {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 15px;
        border-radius: 19px;
        background: #ec4141;
        cursor: pointer;
        height: 38px;
        margin-right: 10px;
        line-height: 38px;

        .play {
          width: 22px;
          height: 22px;
          margin-right: 7px;
        }
        span {
          font-size: 18px;
          color: #ffffff;
          margin-right: 14px;
        }
        .add {
          width: 22px;
          height: 22px;
        }
      }
      .control_coll,
      .control_share,
      .control_down{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 15px;
        border-radius: 19px;
        cursor: pointer;
        margin-right: 10px;
        height: 38px;
        border: 1px solid #cccccc;
        line-height: 38px;
        .coll,
        .share,
        .down{
          width: 22px;
          height: 22px;
          margin-right: 7px;
        }
        span {
          color: #333333;
          font-size: 16px;
        }
      }
    }
    .current_tag {
      display: flex;
      font-size: 16px;
      .tag_title {
        color: #333333;
        margin-right: 10px;
      }
      .tag_item {
        color: #8eabcb;
        margin-right: 5px;
      }
    }
    .current_song {
      display: flex;
      margin-top: 10px;
      font-size: 16px;
      color: #333333;
      .song_title,
      .song_count,
      .song_play,
      .song_num{
        margin-right: 10px;
      }
    }
    .current_intro {
      display: flex;
      font-size: 16px;
      color: #333333;
      margin-top: 10px;
      .intro_name {
        margin-right: 10px;
      }
    }
  }
}
</style>