<template>
  <div class="purchase_page">
    <span>{{ $t('purchasePage.info') }}</span>
    <router-link class="redirect-link" to="contact?purchaseMode=true" @click="$emit('navigate')">
      <span class="link">{{ $t('purchasePage.form') }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PurchasePage',
}
</script>

<style lang="scss" scoped>
.purchase_page {
  > span {
    font-size: 1.2rem;
    line-height: 1.75rem;
  }
 .redirect-link {
    .link {
      @apply text-xl text-link underline cursor-pointer;
    }
  }
}
</style>
