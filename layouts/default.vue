<template>
  <div class="">
    <client-only>
      <Snackbar />
    </client-only>
    <div class="wrapper min-h-screen mx-auto">
      <transition name="">
        <div
          v-if="isShowOverflow"
          class="overflow"
          @click="showSideBar = false"
        />
      </transition>
      <header class="header py-6 px-4">
        <Header>
          <template #before>
            <div
              v-if="isMobileClient"
              class="mr-4"
              @click="showSideBar = !showSideBar"
            >
              <img
                  src="/menu.svg"
                  alt="menu"
                  width="20"
              >
            </div>
          </template>
        </Header>
      </header>
      <aside class="sidebar">
        <div class="navbar">
          <AsideNav
            v-model="showSideBar"
            :is-mobile="isMobileClient"
          />
        </div>
      </aside>
      <main
          class="w-100 flex-1 d-flex flex-column content min-h-screen"
      >
        <div
            class="position-relative d-flex flex-column mx-auto w-100"
        >
          <slot />
        </div>
      </main>
      <footer
          class="footer d-flex justify-end pa-4"
      >
        {{ new Date().getFullYear() }}
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Snackbar from "~/components/Notification/Snackbar.vue";
import AsideNav from "~/components/Navigation/AsideNav.vue";
import {Size, useScreen} from "~/composables/useScreen";

const { isMobile } = useDevice();
const { higherThan } = useScreen()

const showSideBar = ref(false)

const isMobileClient = computed(() => {
  if (import.meta.server) {
    return isMobile
  }
  return !higherThan(Size.MEDIUM)
})

const isShowOverflow = computed(() => {
  return isMobileClient.value && showSideBar.value
})
</script>

<style scoped lang="scss">
.header {
  grid-area: hd;
  border-bottom: 1px solid var(--bg-invert);
  max-height: 50px;
}
.footer {
  grid-area: ft;
  max-height: 50px;
}
.content {
  grid-area: main;
}
.sidebar {
  grid-area: initial;
  border-right: 1px solid var(--bg-invert);
  z-index: 5;
}

.navbar {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

.wrapper {
  max-width: 1024px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-areas:
      "hd hd hd hd hd hd hd hd hd"
      "main main main main main main main main main"
      "ft ft ft ft ft ft ft ft ft";
}

@media (min-width: 768px) {
  .wrapper {
    grid-template-areas:
      "hd hd hd hd hd hd hd hd hd"
      "sd sd main main main main main main main"
      "sd sd ft ft ft ft ft ft ft";
  }

  .sidebar {
    grid-area: sd;
  }
}

@media (min-width: 900px) {
  .wrapper {
    grid-template-areas:
    "hd hd hd hd hd hd hd hd hd"
    "sd sd main main main main main main main"
    "sd sd ft ft ft ft ft ft ft";
  }
}

.overflow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.29);
  z-index: 4;
}
</style>