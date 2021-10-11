<template>
  <div class="control">
    <div @click="changeControl(index)" :class="{control_active:state.currentIndex===index}" class="control_item" v-for="(item,index) in state.control" :key="index">
      {{item}} <span v-show="index===1">({{ songDetail.commentCount }})</span>
    </div>
  </div>
  <!--    歌曲列表-->
  <div  v-show="state.currentChangePage===0" >
    <CurrentSongList :songstime="songstime" :songslist="songslist" />
  </div>
  <!--    歌单评论-->
  <div v-show="state.currentChangePage===1">
    <CurrentComment />
  </div>
  <!--    歌单收藏者-->
  <div v-show="state.currentChangePage===2">
    <CurrentFavorite />
  </div>
</template>

<script setup>
import {reactive, defineProps} from "vue";
import CurrentSongList from "./CurrentSongList";
import CurrentComment from "./CurrentComment";
import CurrentFavorite from "./CurrentFavorite";
const props = defineProps({
  songDetail:Object,
  songslist:Array,
  songstime:Array
})
const state = reactive({
  control:['歌曲列表','评论','收藏者'],
  currentIndex:0, //控制control切换
  currentChangePage:0  //控制组件切换
})
const changeControl = (index) => {
  state.currentIndex = index
  state.currentChangePage = index
}
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  .control_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70%;
    font-size: 16px;
    padding: 0 30px;
    cursor: pointer;
    //background: red;
    //margin-right: 10px;
  }
  .control_active {
    font-size: 18px;
    font-weight: 700;
    border-bottom: 3px solid var(--color-high-text);
  }
}
</style>