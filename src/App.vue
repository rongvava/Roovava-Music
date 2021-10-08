<template>
<div id="app">
  <Article />
  <Aside />
  <Footer />
  <Header />
</div>
</template>

<script>
import Article from "layout/Article";
import Aside from "layout/Aside";
import Footer from "layout/Footer";
import Header from "layout/Header";
export default {
components:{
  Article,
  Aside,
  Footer,
  Header
}
}
</script>

<style lang="scss">

</style>
