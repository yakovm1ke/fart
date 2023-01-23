<script lang='ts' setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import Button from '@/components/ui/button.vue';
import { getFormattedNumber } from '@/helpers';

const router = useRouter()
const store = useMainStore()
const { users, purchases, isUsersValid } = storeToRefs(store)

if (!isUsersValid.value) {
  router.push('/')
}
</script>

<template>
  <div>
    <div :class='$style.heading'>
      FARTING...
    </div>
    <div
      v-if='purchases.length > 0'
      :class='$style.purchases'
    >
      <Purchase
        v-for='(purchase, index) in purchases'
        :key='index'
        :order='index + 1'
        :purchase='purchase'
        :users='users'
        @change-cost='(cost) => store.setCost(index, cost)'
        @change-title='(title) => store.setTitle(index, title)'
        @toggle-user='(user) => store.toggleUser(index, user)'
        @remove-purchase='store.deletePurchase(index)'
      />
    </div>
    <Button
      :class='$style.addPurchaseButton'
      :fill='true'
      @click='store.addPurchase'
    >
      Add purchase
    </Button>
    <div :class='$style.finalFart'>
      <div :class='$style.heading'>FINAL FART</div>
      <div
        :class='$style.costRow'
        v-for='(user, index) in users'
        :key='index'
      >
        <NuxtLink
          :class='$style.link'
          :to='`/details/${user.id}`'
        >
          {{ user.name }}
        </NuxtLink>
        <div :class='$style.cost'>
          {{ getFormattedNumber(store.usersTotalCosts[user.id]) }}
        </div>
      </div>
      <div :class='$style.costRow'>
        <NuxtLink
          :class='$style.link'
          to='/details'
        >
          <div :class='$style.cost'>
            Total
          </div>
        </NuxtLink>
        <div :class='$style.cost'>{{ getFormattedNumber(store.totalCost) }}</div>
      </div>
    </div>
  </div>
</template>

<style module>
.heading {
  font-weight: 600;
  color: var(--main);
}
.purchases {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.addPurchaseButton {
  margin-top: 16px;
}
.finalFart {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.costRow {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.link {
  color: var(--black);
  text-decoration-color: var(--main);
  font-weight: 300;
}
.cost {
  font-weight: 600;
}
</style>