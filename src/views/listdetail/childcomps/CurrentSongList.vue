<template>
<div class="songlist">
  <div class="songlist_title">
    <div class="title_header">
      <div class="title_index"></div>
      <div class="title_handle">操作</div>
    </div>
    <div class="title_music">标题</div>
    <div class="title_songs">歌手</div>
    <div class="title_ablum">专辑</div>
    <div class="title_time">时长</div>
  </div>
  <div class="songlist_item" @dblclick="changeSong(index)" v-for="(item,index) in songslist" :key="item.id">
    <div class="item_header">
      <div class="item_index">{{'0' + (index+1)}}</div>
      <div class="item_handle">13</div>
    </div>
    <div class="item_music">{{ item.name }}</div>
    <div class="item_songs">{{ item.ar[0].name }}</div>
    <div class="item_ablum">{{ item.al.name }}</div>
    <div class="item_time">{{songstime[index]}}</div>
  </div>
</div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const props = defineProps({
  songslist:Array,
  songstime:Array
})
const instance = getCurrentInstance()
const $bus = instance.appContext.config.globalProperties.$bus
const changeSong = (index) => {
  $bus.emit('CurrentIndex',index)
}
</script>

<style lang="scss" scoped>
.songlist {
  width: 100%;
  .songlist_title,
  .songlist_item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    line-height: 35px;
    width: 100%;
    background: #f9f9f9;
    padding: 0 30px;
    cursor: pointer;
    div {
      text-align: left;
    }
    .title_header,
    .item_header{
      display: flex;
      width: 200px;
      .title_index,
      .item_index{
        flex: 1;
      }
      .title_handle,
      .item_handle{
        flex: 1;
      }
    }
    .title_music,
    .item_music{
      flex: 1;
    }
    .title_songs,
    .item_songs{
      flex: 1;

    }
    .title_ablum,
    .item_ablum{
      flex: 1;
    }
    .title_time,
    .item_time{
      width: 200px;
    }
  }
  .songlist_item:nth-child(even) {
    background: #ffffff;
  }
}

</style>