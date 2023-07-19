<script lang='ts' setup>
import { useRouter, useRoute } from 'vue-router'
import {computed} from 'vue'
import Button from './ui/button.vue'
import ThemeSwitchButton from './theme-switch-button.vue'

const router = useRouter()
const route = useRoute()

const isAgainButtonShown = computed(() => {
	return route.path !== '/'
})
</script>

<template>
  <header :class='$style.header'>
    <div :class='$style.title'>
      FART
    </div>
    <div :class='$style.actions'>
      <Button
        v-if='isAgainButtonShown'
        variant='light'
        size='s'
        @click='router.push("/")'
      >
        Fart again
      </Button>
      <ThemeSwitchButton />
    </div>
  </header>
</template>

<style module>
.header {
  width: 100%;
  box-sizing: border-box;
  min-height: 68px;
  display: flex;
  padding: 12px 32px;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  background: var(--main);
  color: var(--white);
  border: 2px solid var(--main);
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
.title {
  font-weight: 900;
  font-size: 24px;
}
.actions {
  display: flex;
  gap: 16px
}
</style>