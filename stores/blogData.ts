import { defineStore } from 'pinia'
import { SnackbarItem, SnackbarStatus} from "~/app/Modules/Snakbar/Contracts";
import {CocktailContract, DefaultCocktailType} from "~/app/Modules/Cocktail/Contaracts";

export const useBlogData = defineStore('blogData', {
  state: (): {
    items: Record<string, CocktailContract[]>
  } => ({
    items: {}
  }),
  actions: {
    getItemsByType (type: DefaultCocktailType) {
      if (this.items[type] && this.items[type].length) {
        return this.items[type]
      }
      return []
    },
    setItemsByType (items: CocktailContract[], type: DefaultCocktailType) {
      if (this.items[type]) {
        this.items[type].splice(0)
      } else {
        this.items[type] = []
      }
      this.items[type].push(...items)
    }
  }
})
