<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
}
</script>

<style scoped>
.base-card {
  border-radius: 16px;
  padding: 12px 20px;
  box-sizing: border-box;
  background: #011F35;
  color: #ffffff;
}
</style>
