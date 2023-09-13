<script setup lang='ts'>
import { useHead } from 'unhead'

useHead({
	title: 'Fart',
})

</script>

<template>
	<div :class="$style.wrapper">
		<Header />

		<div :class="$style.container">
			<main :class="$style.main">
				<slot />
			</main>
		</div>
	</div>
</template>

<style module>
body {
  margin: 0;
}
.wrapper {
  min-height: 100vh;
}
.container {
  max-width: 1280px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 32px 32px 60px;
}
</style>