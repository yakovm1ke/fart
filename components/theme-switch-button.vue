<script setup lang='ts'>
import Button from './ui/button.vue'
import {  themeOptions, changeCssVariable, LocalStorageKey } from '~/utils'
import {ref, computed, onMounted} from 'vue'

const activeThemeIndex = ref(0)

const themes = computed(() => {
	return themeOptions.filter(({disabled}) => !disabled)
})

const getNextThemeIndex = () => {
	if (activeThemeIndex.value === (themes.value.length - 1)) {
		return 0
	} else {
		return activeThemeIndex.value + 1
	}
}

const applyTheme = (index: number) => {
	const theme = themes.value[index]
	activeThemeIndex.value = index

	Object.entries(theme.vars).forEach(([key, value]) => {
		changeCssVariable(key, value)
	})
	localStorage.setItem(LocalStorageKey.Theme, theme.key)
}

const handleClick = () => {
	applyTheme(getNextThemeIndex())
}

const nextTheme = computed(() => {
	const nextThemeIndex = getNextThemeIndex()
	return themes.value[nextThemeIndex]
})

onMounted(() => {
	const storedTheme = localStorage.getItem(LocalStorageKey.Theme)
	const themeIndex = themes.value.findIndex(it => it.key === storedTheme)
	if (themeIndex) return applyTheme(themeIndex)
	applyTheme(0)
})
</script>

<template>
  <Button
    size='s'
    @click='handleClick'
    variant='dark'
		v-if='themes.length > 1'
  >
    Switch to: {{ nextTheme.title }}
  </Button>
	<div v-else>
		No other themes available
	</div>
</template>
