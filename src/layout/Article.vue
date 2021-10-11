<template>
<div class="article_page">
  <div class="article">
    <router-view />
  </div>
</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.article {
  position: fixed;
  top: 75px;
  right: 0;
  bottom: 75px;
  left: 345px;
  overflow-y: scroll;
}
</style>