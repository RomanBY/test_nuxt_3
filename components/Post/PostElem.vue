<template>
  <div>
    <h1>
      {{ itemModel.getTitle() }}
    </h1>
    <div class="">
      <div
          class="pl-4 pl-md-0 pb-4 pb-md-0 image"
      >
        <NuxtImg
            v-if="itemModel.getImg()"
            :src="itemModel.getImg()"
            :alt="itemModel.getTitle()"
            :loading="isLazyLoad ? 'lazy' : 'eager'"
            class="w-100"
        />
      </div>
      <div class="">
        <div>
          <span class="font-weight-bold">Category:</span> {{ itemModel.getCategory() }}
        </div>
        <div>
          <span class="font-weight-bold">Alcoholic:</span> {{ itemModel.getAlcoholic() }}
        </div>
        <div>
          <span class="font-weight-bold">Glass:</span> {{ itemModel.getGlass() }}
        </div>
        <div class="mt-6">
          <div>
            <span class="font-weight-bold">Instructions:</span>
          </div>
          <div>
            {{ itemModel.getInstructions() }}
          </div>
        </div>
        <div
            v-if="itemModel.getIngredients().length"
            class="mt-6"
        >
          <div class="mb-2">
            <span class="font-weight-bold">List of ingredients:</span>
          </div>
          <div
              v-for="(el, key) in itemModel.getIngredients()"
              :key="key"
          >
            {{ key + 1 }}. <span v-if="el.measure">{{ el.measure }}</span> <span v-if="el.ingredient">{{ el.ingredient }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CocktailContract} from "~/app/Modules/Cocktail/Contaracts";
import CocktailModel from "~/app/Modules/Cocktail/Model/CocktailModel";

interface Props {
  item: CocktailContract
  isLazyLoad?: boolean
}

const props = defineProps<Props>()

const itemModel = computed(() => {
  return new CocktailModel(props.item)
})
</script>

<style scoped lang="scss">
.image {
  float: right;
  width: 30%;
}

@media (min-width: 700px) {

}
</style>