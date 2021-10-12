<template>
<!--播放歌曲-->
<div class="play_page">
  <div class="play_cover">
    <div class="play_image">
      <img v-show="state.currentPlayImages[index]" :src="state.currentPlayImages[index]" alt="">
    </div>
    <div class="play_info" v-show="state.currentPlayName[index]">
      <div class="play_name">
        <span>{{state.currentPlayName[index]}}</span>
        <i><svg class="icon love" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
        </i>
      </div>
      <div class="play_nickname">{{state.currentPlayAlbum[index]}}</div>
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
      <audio ref="audioRefs" @ended="MusicEnded" @timeupdate="audioTimeUpdate" :src="state.currentPlaySong"></audio>
      <span class="starttime">{{ state.currentAudioTime }}</span>
      <a-progress class="progre" :showInfo="false" style="width: 90%;" :percent="state.currentprogre" trailColor="#ddd" strokeColor="#ff5777"></a-progress>
      <span class="sumtime" v-show="state.currentTime">{{ state.currentTime }}</span>
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
import { ref, reactive,toRaw,getCurrentInstance,computed } from "vue";
import { getSongUrl,getSongDetail,_getSongDetailImg } from 'network/detail'
import {message} from "ant-design-vue";
import {formatDate} from 'common/Utils'
let index = ref(0)
let audioRefs = ref(null)
console.log(audioRefs)
console.log(formatDate(new Date(15.177143*1000), 'mm:ss'));
let state = reactive({
  songsList:[],
  currentPlaySong: '',  //当前播放url
  changeBtn: false,  //控制播放暂停按钮的切换
  currentSongDetail:{},
  currentPlayIndex: null,
  currentPlayImages:'', //当前播放歌曲的图片
  currentPlayName: '',  //当前播放歌曲的专辑
  currentPlayAlbum: '',  //当前播放歌曲的歌手
  currentPlayTime:'',  //当前播放歌曲的列表时长
  currentSongList:[],  //当前歌单的歌曲列表
  currentDetail:{},  //点击获取当前的歌曲详情
  currentTime: '',  //点击获取当前的歌曲时长
  currentAudioTime: '00:00', //播放过的时间
  currentprogre: 0,  //当前播放的进度条
})
// state.currentAudioTime = computed(() => {
//     return formatDate(new Date(audioRefs.value.currentTime * 1000), "mm:ss") || "00:00";
// })

//拿到本地存储的当前歌单的歌曲id列表
  let songlisturl = window.localStorage.getItem('songlisturl')
const _getSongDetail = async () => {
  //请求歌曲列表详情
 let res = await  getSongDetail(songlisturl)
  //只拿到需要的数据
  let pic = new _getSongDetailImg(res.songs)
  state.currentSongDetail = pic
}
_getSongDetail()
//请求歌曲列表url地址
const _getSongUrl = async () => {
  let res = await getSongUrl(songlisturl)
  //歌曲列表url
  state.songsList = res.data
  changeUrlIndex(index.value)
}
_getSongUrl()
//传递url
const changeUrlIndex = (index) => {
  state.currentPlaySong = state.songsList[index].url
}
const $bus = getCurrentInstance().appContext.config.globalProperties.$bus
$bus.on('songsList',index => {
  state.currentSongList = index
})
//接受传过来的事件  点击歌曲播放
$bus.on('CurrentIndex',option => {
  state.currentDetail = state.currentSongList[option]
  console.log(state.currentDetail)
  state.currentPlayIndex = option
  index.value = option
  state.currentPlayImages = window.localStorage.getItem('pic').split(',')
  state.currentPlayName = window.localStorage.getItem('name').split(',')
  state.currentPlayAlbum = window.localStorage.getItem('album').split(',')
  // state.currentPlayTime = window.localStorage.getItem('time').split(',')
  //传递url
  changeUrlIndex(option)
  //播放
  audioRefs.value.autoplay = true
  audioRefs.value.play()
  state.changeBtn = true
  //显示对应歌曲信息

})
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
//播放时间改变调用
const audioTimeUpdate = () => {
  //格式化当前播放的时间
  state.currentAudioTime = formatDate(new Date(audioRefs.value.currentTime*1000),'mm:ss')
  state.currentTime = formatDate(new Date(audioRefs.value.duration*1000),'mm:ss')
  state.currentprogre = audioRefs.value.currentTime/audioRefs.value.duration*100
}
//播放结束调用
const MusicEnded = () => {
  state.changeBtn = false
  setTimeout(() => {
    //切换下一首歌
    switchSong('next')
    //播放进度条置为0
    state.currentTime = 0
  }, 2000)
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
        width: 65px;
        height: 65px;
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
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        height: 23px;
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
      .play_nickname {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
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