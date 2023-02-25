<script setup lang='ts'>
import { useHead } from 'unhead'

useHead({
	title: 'Fart',
})

</script>

<template>
  <div :class='$style.page'>
    <Header />

    <div :class='$style.container'>
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
  max-width: 1280px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 32px 32px 60px;
}
.image {
  display: flex;
  position: relative;
  bottom: 3px;
}
</style>