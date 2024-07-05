<template>
  index
</template>

<script setup lang="ts">
import {definePageMeta} from "~/.nuxt/imports";

definePageMeta({
  middleware: () => {
    return navigateTo('/margarita')
  }
})
</script>

<style scoped lang="scss">

</style>