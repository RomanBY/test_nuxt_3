<template>
  <Html
      :lang="locale"
  >
    <Body>
      <NuxtLayout name="default">
        <NuxtLoadingIndicator
            :height="5"
            :duration="3000"
            :throttle="400"
            color="black"
        />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
<script lang="ts" setup>
import { AppSetup } from './utils/app'

AppSetup()

useHead({
  title: 'Cocktail blog',
  titleTemplate: '',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Cocktail blog'
    }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})

const locale = 'ru'
</script>
