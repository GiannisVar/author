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
 .redirect-link {
    .link {
      @apply text-lg underline cursor-pointer;
    }
  }
}
</style>
