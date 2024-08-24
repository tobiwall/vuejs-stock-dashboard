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
  padding: 20px 32px;
  background: #011F35;
  color: #ffffff;
}
</style>
