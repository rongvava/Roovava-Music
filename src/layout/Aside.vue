<template>
<div class="aside_page">
  <div class="aside">
    <div class="menu_list">
      <div @click="changeHigh(index)" :class="{active:state.currentIndex===index}" class="menu_item" v-for="(item,index) in state.menuList" :key="item.title">
        <i :class="item.icon"></i>
        {{item.title}}
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import {reactive} from "vue";

    let state = reactive({
      menuList:[
        {icon:'iconfont icon-yinle',title:'个性推荐'},
        {icon:'iconfont icon-gedan',title:'歌单'},
        {icon:'iconfont icon-paihangbang',title:'排行榜'},
        {icon:'iconfont icon-yunyinle-geshou',title:'歌手'},
        {icon:'iconfont icon-MV',title:'MV'},
        {icon:'iconfont icon-zuixinxinwen',title:'最新音乐'},
      ],
      currentIndex:0
    })
    //点击menu高亮
    const changeHigh = (index) => {
      state.currentIndex = index
    }
</script>

<style lang="scss" scoped>
.aside {
  position: fixed;
  top: 75px;
  width: 345px;
  background: #f9f9f9;
  bottom: 75px;
  left: 0;
  .menu_list {
    width: 100%;
    .menu_item {
      display: flex;
      align-items: center;
      height: 50px;
      width: 100%;
      font-size: 18px;
      color: #000;
      cursor: pointer;
      padding-left: 20px;
      i {
        font-size: 28px;
        margin-right: 20px;
      }
    }
    .active {
      color: var(--color-high-text);
    }
  }
}
</style>