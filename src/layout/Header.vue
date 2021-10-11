<template>
<div class="header_page">
  <div class="header">
    <div class="menu_list">
      <div class="menu_item home"></div>
      <div class="menu_item back"></div>
      <div class="menu_item fullscreen"></div>
    </div>
    <div class="move_back">
      <i class="iconfont icon-fanhui icon_back"></i>
      <i class="iconfont icon-fanhui-copy icon_move"></i>
    </div>
    <div class="search_input">
      <div class="search_box">
        <input type="text" placeholder="请输入内容">
        <svg class="icon icon_magnifying" aria-hidden="true">
          <use xlink:href="#icon-fangdajing"></use>
        </svg>
      </div>
    </div>
    <div class="func">
      <div class="portrait">
        <svg class="icon icon_magnifying" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
        </svg>
      </div>
      <div class="func_item">
        <div class="changebg">
          <svg class="icon icon_magnifying" aria-hidden="true">
            <use xlink:href="#icon-pifu"></use>
          </svg>
        </div>
        <div class="flower">
          <svg class="icon icon_magnifying" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
          </svg>
        </div>
        <div class="github">
          <svg class="icon icon_magnifying" aria-hidden="true">
            <use xlink:href="#icon-github"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 75px;
  background: #f9f9f9;
  .menu_list {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 173px;
    height: 100%;
    .menu_item {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: red;
    }
    .home {
      background: #ed655a;
    }
    .back {
      background: #e0c04c;
    }
    .fullscreen {
    background: #72be47;
    }
  }
  .move_back {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 173px;
    height: 100%;
    .icon_back,.icon_move {
      font-size: 24px;
    }
  }
  .search_input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 347px;
    height: 100%;
    //background: pink;
    .search_box {
      position: relative;
      width: 275px;
      height: 44px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 10px;
      input {
        width: 235px;
        height: 100%;
        outline: none;
        border: none;
        padding-left: 20px;
        font-size:14px;
        border-radius: 10px;
      }
      .icon_magnifying {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
    }

  }
  .func {
    display: flex;
    width: 300px;
    height: 100%;
    margin-left: 100px;
    .portrait {
      display: flex;
      align-items: center;
      width: 100px;
      height: 100%;
      .icon {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
    .func_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      .icon {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>