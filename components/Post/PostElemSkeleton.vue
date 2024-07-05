<template>
  <div class="w-100">
    <SkeletonBlock
        :height="38"
        :width="200"
        class="my-5"
    />
    <div class="d-flex justify-space-between">
      <div>
        <SkeletonBlock
            :height="66"
            :width="300"
            class="mb-5"
        />
        <SkeletonBlock
            :height="100"
            width="100%"
            class="mb-5"
        />
        <SkeletonBlock
            :height="100"
            :width="250"
            class="mb-5"
        />
      </div>
      <SkeletonBlock
          :height="250"
          :width="250"
          class="mb-5 d-none d-md-block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>