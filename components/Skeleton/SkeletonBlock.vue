<template>
  <div
    :style="{ width: compWidth, height: compHeight }"
    class="skeleton"
    :class="{ 'skeleton--rounded': isRounded }"
  />
</template>

<script setup lang="ts">
interface Props {
  width: number | string
  height: number | string
  isRounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isRounded: false
})

const compWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  }
  return props.width
})

const compHeight = computed(() => {
  if (typeof props.height === 'number') {
    return props.height + 'px'
  }
  return props.height
})
</script>

<style scoped lang="scss">
@import "/assets/sass/animations/skeleton";

.skeleton {
  @include skeleton_animation;

  &--rounded {
    border-radius: 5px;
  }
}
</style>
