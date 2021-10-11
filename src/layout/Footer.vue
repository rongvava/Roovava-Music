<template>
<div class="footer_page">
  <div class="footer">
    <Play />
  </div>
</div>
</template>

<script setup>
import Play from 'views/plays/Play'
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
  left: 0;
  right: 0;
  background: #f9f9f9;
  border-top: 1px solid #ccc;
}
</style>