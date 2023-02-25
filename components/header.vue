<script lang='ts' setup>
import { useRouter } from 'vue-router'
import Button from './ui/button.vue'

const router = useRouter()
</script>

<template>
  <header :class='$style.header'>
    <div :class='$style.title'>
      FART
    </div>
    <Button
      variant='light'
      size='s'
      @click='router.push("/")'
    >
      Fart again
    </Button>
  </header>
</template>

<style module>
.header {
  width: 100%;
  box-sizing: border-box;
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
</style>