<template>
<!--  轮播图-->
  <BannerSlider />
<!--  推荐歌单-->
  <MusicList :music-list="state.musicList" />
<!--  独家放送-->
  <Privatecontent :private-list="state.privateList" />
<!--  最新音乐-->
  <NewSongs :new-songs-list="state.newSongList" />

</template>

<script setup>
import {
  getPersonalized,
  getPrivatecontent,
  getNewSong
} from 'network/recommendation'
import BannerSlider from "components/content/BannerSlider"
import MusicList from "components/content/musiclist/MusicList";
import Privatecontent from "views/recommendation/childcomps/Privatecontent";
import NewSongs from "views/recommendation/childcomps/NewSongs";
import {reactive} from "vue";
    const state = reactive({
      musicList:[], //推荐歌单
      privateList:[],  //独家放送
      newSongList:[]  //最新音乐
    })

    //推荐歌单
    const _getPersonalized = async () => {
      let res = await getPersonalized(10)
      state.musicList = res.result
    }
    _getPersonalized()
    //独家放送
    const _getPrivatecontent = async () => {
      let res = await getPrivatecontent()
      state.privateList = res.result
    }
    _getPrivatecontent()
    //最新音乐
    const _getNewSong = async () => {
      let res = await getNewSong()
      console.log(res)
      state.newSongList = res.result
    }
    _getNewSong()
</script>

<style lang="scss" scoped>
</style>