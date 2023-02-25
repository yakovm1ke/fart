<script lang='ts' setup>
import { Purchase, useMainStore, User } from '@/stores/main'
import { storeToRefs } from 'pinia'
import UserPurchaseDetails from '@/components/user-purchase-details.vue'
import { downloadFile, getFormattedNumber } from '@/helpers'
import { useRouter } from 'vue-router'
import { useHead } from 'unhead'
import Button from '@/components/ui/button.vue'
import html2canvas from 'html2canvas'

const router = useRouter()
const store = useMainStore()
const {users, purchases, isUsersValid} = storeToRefs(store)

useHead({
	title: 'Details',
})

if (!isUsersValid.value) {
	router.push('/farting')
}

function getUserPurchases(user: User): Purchase[] {
	return purchases.value.filter(purchase => purchase.users.some(purchaseUser => purchaseUser.id === user.id))
}
function getUserTotalCost(user: User) {
	return store.usersTotalCosts[user.id] ?? 0
}
function captureScreenshot() {
	const captureElement = document.body

	if (!captureElement) return

	html2canvas(captureElement).then(canvas => {
		const imageUrl = canvas.toDataURL('image/png')
		downloadFile(imageUrl, `Fart-${new Date().toLocaleDateString()}.png`)
	})
}
</script>

<template>
  <UiNuxtLink to='/farting'>
    Back to farting
  </UiNuxtLink>

  <div id='capture'>
    <div :class='$style.users'>
      <UserPurchaseDetails
        v-for='user in users'
        :key='user.id'
        :user='user'
        :purchases='getUserPurchases(user)'
        :total-cost='getUserTotalCost(user)'
      />
    </div>
    <div :class='$style.total'>
      <span :class='$style.totalTitle'>Total: </span>
      <span>{{ getFormattedNumber(store.totalCost) }}</span>
    </div>
  </div>

  <Button
    v-if='store.totalCost'
    :class='$style.screenshotButton'
    @click='captureScreenshot'
  >
    Capture screen
  </Button>
</template>

<style module>
.total {
  margin-top: 28px;
  font-size: 24px;
}
.totalTitle {
  font-weight: 600;
}
.users {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.screenshotButton {
  margin-top: 32px;
}
</style>