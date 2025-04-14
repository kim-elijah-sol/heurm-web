<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <h1 :class="$style.title">{{ msg }}</h1>
</template>

<style module>
.title {
  font-size: 24px;
}
</style>
