<template>
  <nav
      class="aside"
      :class="{ 'aside__float': isMobile, 'aside__float--active': isMobile && modelValue }"
  >
    <ul class="pl-0 d-flex flex-column aside__float__wrap">
      <li
        v-for="(el, key) in items"
        :key="key"
        class="aside__elem d-flex"
      >
        <NuxtLink
          :to="`/${el.value}`"
          class="aside__link px-4 py-2 text-no-decoration text-size--5 text-color--gray w-100"
          active-class="text-color--black"
          @click="modelValue = false"
        >
          {{ el.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {DefaultCocktailType} from "~/app/Modules/Cocktail/Contaracts";

const props = defineProps<{
  modelValue: boolean
  isMobile: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const modelValue = useSyncProps<boolean>(props, 'modelValue', emit)

const items: { name: string, value: DefaultCocktailType }[] = [
  {
    name: 'Margarita',
    value: 'margarita'
  },
  {
    name: 'Mojito',
    value: 'mojito'
  },
  {
    name: 'A1',
    value: 'a1'
  },
  {
    name: 'Kir',
    value: 'kir'
  }
]
</script>

<style scoped lang="scss">
.aside {
  &__elem {
    list-style-type: none;
  }

  &__link {
    transition: 250ms;
  }

  &__float {
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 5;
    width: 300px;
    height: 100%;
    display: flex;
    transition: 150ms;

    &--active {
      left: 0;
    }

    &__wrap {
      width: 100%;
      background: var(--bg);
      margin: 0;
    }
  }
}
</style>