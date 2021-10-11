<template>
<div class="banner">
  <svg class="icon pre" aria-hidden="true" @click="changeImg('pre')">
    <use xlink:href="#icon-shangyizhang"></use>
  </svg>
  <div class="banner_item">
    <a-carousel ref="carouselRefs" autoplay>
      <img :src="item.pic" alt=""  v-for="(item,index) in bannerList" :key="item.bannerId">
    </a-carousel>
  </div>
  <svg class="icon next" aria-hidden="true" @click="changeImg('next')">
    <use xlink:href="#icon-xiayizhang"></use>
  </svg>
</div>
</template>
<script>
import { getBannerList } from 'network/recommendation'
import { reactive,toRefs,ref } from "vue";

export default {
  name: "BannerSlider",
  setup() {
    let carouselRefs = ref(null)
    const state = reactive({
      bannerList:[],
      timer:null
    })
    //轮播图数据
    const getBanner = async () => {
     let res = await getBannerList(2)
      state.bannerList = res.banners
    }
    getBanner()
    //点击切换图片
    const changeImg = (type) => {
      if(type === 'pre') {
        carouselRefs.value.prev()
      }else {
        carouselRefs.value.next()
      }
      //1000毫秒后在开启自动轮播
      carouselRefs.value.autoplay = false
      state.timer && clearTimeout(timer)
       state.timer = setTimeout(() => {
        carouselRefs.value.autoplay = true
      }, 1000)
    }
    return {
      ...toRefs(state),
      carouselRefs,
      getBanner,
      changeImg
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 351px;
  margin: 20px auto;
  .icon {
    display: block;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .banner_item {
    width: 904.5px;
    height: 100%;
    .ant-carousel {
      width: 100%;
      height: 100%;
    }
  }

}
</style>