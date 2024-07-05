import { defineStore } from 'pinia'
import { SnackbarItem, SnackbarStatus} from "~/app/Modules/Snakbar/Contracts";

export const useUtils = defineStore('utils', {
  state: (): {
    snackbarItems: SnackbarItem[]
  } => ({
    snackbarItems: []
  }),
  actions: {
    deleteSnackbarItem (timestamp: number) {
      const index = this.snackbarItems.findIndex(el => el.timestamp === timestamp)
      if (index >= 0) {
        this.snackbarItems.splice(index, 1)
      }
    },
    setSnackbarItem (item: SnackbarItem) {
      this.snackbarItems.unshift(item)
    },
    addSnackbarItem (item: SnackbarItem) {
      item.timestamp = Date.now()
      this.setSnackbarItem(item)
      let autoHide = true
      if (item.isPermanent) {
        autoHide = false
      }
      if (autoHide) {
        this.timeoutForDeleteSnackbarItem(item.timestamp)
      }
    },
    timeoutForDeleteSnackbarItem (timestamp: number) {
      setTimeout(() => {
        this.deleteSnackbarItem(timestamp)
      }, 2500)
    }
  }
})
