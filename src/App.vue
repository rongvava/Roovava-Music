<template>
<div id="app">
  <Article />
  <Aside />
  <Footer />
  <Header />
</div>
</template>

<script setup>
import Article from "layout/Article";
import Aside from "layout/Aside";
import Footer from "layout/Footer";
import Header from "layout/Header";
</script>

<style lang="scss">
@import "assets/css/base.css";
@import url('//at.alicdn.com/t/font_2853315_qyb7fmria4.css');
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
