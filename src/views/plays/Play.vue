<template>
<!--播放歌曲-->
<div class="play_page">
  <div class="play_cover">
    <div class="play_image">
      <img :src="state.currentPlayImages[index]" alt="">
<!--      -->
<!--      -->
    </div>
    <div class="play_info">
      <div class="play_name"><span>{{state.currentPlayAlbum[index]}}</span><i><svg class="icon love" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg></i></div>
      <div class="play_nickname">{{state.currentPlayName[index]}}</div>
    </div>
  </div>
  <div class="play_control">
    <div class="control_item">
      <div class="item_pre">
        <svg class="icon pre" aria-hidden="true" @click="switchSong('pre')">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
      </div>
      <div class="item_play">
        <svg class="icon play" aria-hidden="true" v-show="!state.changeBtn" @click="changeSong('play')">
          <use xlink:href="#icon-bofangqi-bofang"></use>
        </svg>
        <svg class="icon pause" aria-hidden="true" v-show="state.changeBtn" @click="changeSong('pause')">
          <use xlink:href="#icon-zanting1"></use>
        </svg>
      </div>
      <div class="item_next">
        <svg class="icon next" aria-hidden="true" @click="switchSong('next')">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
      </div>
    </div>
    <div class="control_progress">
      <audio ref="audioRefs" :src="state.currentPlaySong"></audio>
      <span class="starttime">00:00</span>
      <a-progress class="progre" :showInfo="false" style="width: 90%;" :percent="10" trailColor="#ddd" strokeColor="#ff5777"></a-progress>
      <span class="sumtime">{{ state.currentPlayTime[index] }}</span>
    </div>
  </div>
  <div class="play_more_func">
    <div class="play_more_item">
<!--      {{state.currentSongDetail.pic[0].picUrl}}-->
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive,toRaw,getCurrentInstance } from "vue";
import { getSongUrl,getSongDetail,_getSongDetailImg } from 'network/detail'
import {message} from "ant-design-vue";
let index = ref(0)
let audioRefs = ref(null)
console.log(audioRefs)
let state = reactive({
  songsList:[],
  currentPlaySong: '',  //当前播放url
  changeBtn: false,  //控制播放暂停按钮的切换
  currentSongDetail:{},
  currentPlayIndex: null,
  currentPlayImages:'', //当前播放歌曲的图片
  currentPlayName: '',  //当前播放歌曲的专辑
  currentPlayAlbum: '',  //当前播放歌曲的歌手
  currentPlayTime:'',  //当前播放歌曲的时长
})
//拿到本地存储的当前歌单的歌曲id列表
  let songlisturl = window.localStorage.getItem('songlisturl')
const _getSongDetail = async () => {
 let res = await  getSongDetail(songlisturl)
  //只拿到需要的数据
  let pic = new _getSongDetailImg(res.songs)
  state.currentSongDetail = pic
  console.log(state.currentSongDetail)
  console.log(pic)
}
_getSongDetail()
//接受传过来的事件  点击歌曲播放
const $bus = getCurrentInstance().appContext.config.globalProperties.$bus
$bus.on('CurrentIndex',option => {
  state.currentPlayIndex = option
  index.value = option
  console.log(index.value)
  console.log(window.localStorage.getItem('pic'));
  state.currentPlayImages = window.localStorage.getItem('pic').split(',')
  state.currentPlayName = window.localStorage.getItem('name').split(',')
  state.currentPlayAlbum = window.localStorage.getItem('album').split(',')
  state.currentPlayTime = window.localStorage.getItem('time').split(',')
  //传递url
  changeUrlIndex(option)
  //播放
  audioRefs.value.autoplay = true
  audioRefs.value.play()
  state.changeBtn = true
  //显示对应歌曲信息

})
console.log(songlisturl)
//请求歌曲列表url
const _getSongUrl = async () => {
  let res = await getSongUrl(songlisturl)
  state.songsList = res.data
  console.log(state.songsList)
  changeUrlIndex(index.value)
}
_getSongUrl()
//传递url
const changeUrlIndex = (index) => {
  state.currentPlaySong = state.songsList[index].url
}
//  播放/暂停/歌曲
const changeSong = (type) => {
  //点击播放
  if (type==='play') {
    //判断该歌曲是否为空
    if(state.songsList[index.value].url===null) return message.warning('该歌曲暂无MP3')
    //播放歌曲 显示对应的图片
    state.changeBtn = true
    audioRefs.value.play()
    //点击暂停
  }else {
    if(state.songsList[index.value].url===null) return message.warning('该歌曲暂无MP3')
    state.changeBtn = false
    audioRefs.value.pause()
  }
}
function common() {
  changeUrlIndex(index.value)
  audioRefs.value.autoplay = true
  state.changeBtn = true
}
//切换歌曲
const switchSong = (type) => {
  //点击上一首 让当前播放歌曲暂停
  if(type==='pre') {
    audioRefs.value.pause()
    state.changeBtn = false
    //播放列表的索引   为0时 改成最后一位索引
    if(index.value === 0) {
      index.value = toRaw(state.songsList.length - 1)
    }
     index.value -= 1
    //当前歌曲url不存在
    if(state.songsList[index.value].url===null) {
        message.warning('该歌曲暂无MP3')
      state.changeBtn = false
      return
    }
    console.log(index.value)
    console.log(state.songsList[index.value])
    common()
  }else {
    audioRefs.value.pause()
    state.changeBtn = false
    console.log(index.value)
    //播放列表的索引   为最后一位时时 改成0
    if (index.value === toRaw(state.songsList.length - 1)) {
      index.value = 0
    }
    index.value+= 1
    //当前歌曲url不存在
    if(state.songsList[index.value].url === null) {
      return message.warning('当前歌曲暂无MP3')
      state.changeBtn = false
      return
    }
    console.log(index.value)
    common()
  }
}


</script>

<style lang="scss" scoped>
.play_page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  .play_cover {
    align-items: center;
    display: flex;
    width: 300px;
    height: 100%;
    .play_image {
      width: 65px;
      height: 65px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .play_info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 10px 0;
      margin-left: 25px;
      font-size: 16px;
      .play_name {
        display: flex;
        span {}
        i {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20px;
          .love {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
  .play_control {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    margin: 0 150px;
    padding: 5px 0;
    .control_item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60%;
      width: 100%;
      .item_play {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: rgba(0,0,0,.1);
        cursor: pointer;
        margin: 0 20px;
      }
      .item_next,
      .item_pre{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .icon {
        width: 24px;
        height: 24px;
      }
    }
    .control_progress {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      .progre {
        cursor: pointer;
        margin: 0 5px;
        height: 100%;
        line-height: 23px;
      }
      .sumtime,
      .starttime {
        font-size: 18px;
        margin: 0 20px;
      }
    }
  }
  .play_more_func {
    width: 300px;
    height: 100%;
  }
}
</style>