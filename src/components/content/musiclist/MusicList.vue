<template>
<div class="musiclist">
  <div class="music_title">推荐歌单</div>
  <div class="music_content">
    <div class="music_item"
         v-for="(item,index) in musicList" :key="item.id"
         @mouseover="changePlayBtn(index)"
         @mouseleave="changePlayLeave" @click="tomusicdetail(index)">
      <div class="music_images">
        <img :src="item.picUrl" alt="">
        <transition name="play">
          <svg class="icon play" aria-hidden="true" v-show="isShowPlay===index">
            <use xlink:href="#icon-bofangqi-bofangshu"></use>
          </svg>
        </transition>
        <div class="playcount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tingge"></use>
          </svg>
          <div class="count">{{ item.playCount }}</div>
        </div>
      </div>
      <div class="music_text">{{item.name}}</div>
    </div>
  </div>
</div>
</template>

<script setup>
import {ref,defineProps} from "vue";
import {useRouter} from 'vue-router'
const props = defineProps({
  musicList:Array
})
    const router = useRouter()
    let isShowPlay = ref(false)
    const changePlayBtn = (index) => {
      isShowPlay.value = index
    }
    const changePlayLeave = () => {
      isShowPlay.value = false
    }
    const tomusicdetail = (index) => {
      console.log(props.musicList[index].id)
  router.push(`/musiclistdetail/${props.musicList[index].id}/${new Date().getTime()}`)
    }
</script>

<style lang="scss" scoped>
.play-enter-active {
  animation: slideInDown 0.4s;
}
.play-leave-active {
  animation: slideInDown 0.4s reverse;
}
.musiclist {
  width: 1200px;
  margin: 0 auto;
  .music_title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .music_content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .music_item {
      display: flex;
      flex-direction: column;
      width: 220px;
      height: 270px;
      border-radius: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      .music_images {
        position: relative;
        width: 220px;
        height: 220px;
        .playcount {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: absolute;
          right: 5px;
          top: 5px;
          .count {
            color: #ffffff;
            font-size: 16px;
          }
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 2px;
          }
        }
        .play {
          position: absolute;
          bottom: 10px;
          left: 10px;
          width: 40px;
          height: 40px;
        }
        img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .music_text {
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