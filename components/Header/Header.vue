<template>
  <div class="d-flex align-center">
    <slot name="before" />
    <div>
      <NuxtLink
        to="/"
        class="text-size--5 font-weight-bold text-no-decoration text-color--main"
      >
        Cocktail blog
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>