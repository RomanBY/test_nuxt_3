<template>
  <div class="pa-4">
    <div
      v-if="data && data.items && data.items.length"
    >
      <div
        v-for="(el, key) in data.items"
        :key="el.idDrink"
        class="mb-4"
      >
        <PostElem
          :item="el"
          :is-lazy-load="key > 0"
        />
        <div class="divider w-100 my-5" />
      </div>
    </div>
    <client-only v-else-if="status === 'pending'">
      <PostElemSkeleton />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import {useBlogData} from "~/stores/blogData";
import {CocktailContract, CocktailResponseContract, DefaultCocktailType} from "~/app/Modules/Cocktail/Contaracts";
import CocktailApi from "~/app/Modules/Cocktail/Api/CocktailApi";
import {useUtils} from "~/stores/utils";
import {SnackbarStatus} from "~/app/Modules/Snakbar/Contracts";

const route = useRoute()
const slug = route.params.slug as DefaultCocktailType
const blogData = useBlogData()
const utils = useUtils()

definePageMeta({
  middleware: ['blog-checker']
})

const { data, status } = await useLazyAsyncData(`getItems_${slug}`, async () => {
  const items: CocktailContract[] = []
  if (blogData.getItemsByType(slug).length) {
    items.push(...blogData.getItemsByType(slug))
  } else {
    const res = await CocktailApi.getCocktailsByType<CocktailResponseContract>(slug)
    if (res.isSuccess()) {
      if (res.getData().drinks && res.getData().drinks!.length) {
        blogData.setItemsByType(res.getData().drinks!, slug)
        items.push(...res.getData().drinks!)
      } else if (import.meta.client) {
        utils.setSnackbarItem({
          message: 'No record',
          status: SnackbarStatus.WARNING,
        })
      }
    } else {
      utils.setSnackbarItem(res.getSnackbarInfo())
    }
    if (import.meta.client) {
      useHead({
        title: items[0]?.strDrink || '',
        titleTemplate: items[0]?.strDrink || '',
        meta: [{
          name: 'description',
          content: items[0]?.strCategory || ''
        }]
      })
    }
  }
  return {
    items
  }
})

useHead({
  title: data.value?.items[0]?.strDrink || '',
  titleTemplate: data.value?.items[0]?.strDrink || '',
  meta: [{
    name: 'description',
    content: data.value?.items[0]?.strCategory || ''
  }]
})
</script>

<style scoped lang="scss">

</style>