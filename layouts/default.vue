<script setup lang='ts'>
import carrot from '@/assets/icons/carrot.svg'
import { useHead } from 'unhead'

useHead({
	title: 'Fart',
})

</script>

<template>
  <div :class='$style.page'>
    <div :class='$style.container'>
      <header>
        <NuxtLink
          :class='$style.logo'
          to='/'
        >
          <img
            :src='carrot'
            :class='$style.image'
          >
          <div :class='$style.heading'>FART</div>
        </NuxtLink>
      </header>
      <main :class='$style.main'>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style module>
body {
  margin: 0;
}
.page {
  min-height: 100vh;
}
.container {
  max-width: 900px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 32px 32px 60px;
}
.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}
.logo:hover {
  cursor: pointer;
}
.heading {
  color: var(--main);
  font-weight: 900;
  font-size: 24px;
}
.image {
  display: flex;
  position: relative;
  bottom: 3px;
}
.main {
  margin-top: 24px;
}
</style>