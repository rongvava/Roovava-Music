<template>
  <div class="detial">
<!--    当前的歌单详情-->
    <CurrentDetail :song-detail="state.songDetail" />
<!--    当前歌曲列表-->
    <CurrentContent :songstime="state.currentSongsTime" :songslist="state.currentSongsList" :song-detail="state.songDetail" />
  </div>
</template>
<script setup>
import CurrentDetail from './childcomps/CurrentDetail'
import CurrentContent from "./childcomps/CurrentContent";
import { reactive } from 'vue'
import { useStore } from 'vuex'
import {
  getMusicListDetail,
  getSongDetail,
  songDetail
} from 'network/detail'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()
let id = route.fullPath.split('/')
console.log(id)  //6892137815
let CrrentDetailId = id[2]
let state = reactive({
  songlist:[],  //当前歌单的歌曲列表id
  songIds:[],   //分割好的歌曲列表id
  songDetail:{},  //歌单详情
  currentSongsList:[],  //当前歌单的歌曲列表
  currentSongsTime:[],  //当前歌单的歌曲列表时长
})
//获取歌单详情
const _getMusicListDetail = async () => {
  const  res = await getMusicListDetail(id[2])
  state.songlist = res.playlist.trackIds
  state.songDetail = res.playlist
  let ids = state.songlist.map(item => {
    return item.id
  })
  state.songIds = ids.join(',')
  //传递歌曲列表id
     store.dispatch('_getSongUrl', state.songIds)

  if(window.localStorage.getItem('songlisturl')) {
    window.localStorage.removeItem('songlisturl')
    window.localStorage.setItem('songlisturl',state.songIds)
  }else {
     window.localStorage.setItem('songlisturl',state.songIds)
  }
  //获取歌曲列表
  console.log(state.songIds)
  let resu = await getSongDetail(state.songIds)
  console.log(resu)
  let songs = new songDetail(resu.songs)
  console.log(songs)
  state.currentSongsTime = songs.time
  state.currentSongsList = resu.songs
  window.localStorage.setItem('pic',songs.pic)
  window.localStorage.setItem('album',songs.album)
  window.localStorage.setItem('name',songs.name)
  window.localStorage.setItem('time',songs.time)
}
_getMusicListDetail()
</script>

<style lang="scss" scoped>
.detial {
  width: 100%;
  height: 300px;
  padding: 20px 30px;
}
</style>