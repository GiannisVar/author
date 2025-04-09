<template>
    <div class="main_header">
        <img class="logo" :src="logo" alt="logo" @click="navigateToHome"/>
        <MainMenu @open_sidebar_menu="$emit('open_sidebar', $event )" @navigation="$emit('navigation')" />
    </div>
</template>

<script>
import MainMenu from './menu/MainMenu';
import Logo from '../assets/logo/logo.png';
import { PAGES } from '../router/paths';

export default {
    name: 'MainHeader',
    components: { MainMenu },
    created() {
        this.logo = Logo;
    },
  methods: {
    navigateToHome() {
      if(this.$route.name !== PAGES.HOMEPAGE.name) {
        this.$emit('navigation');
        this.$router.push({ name: PAGES.HOMEPAGE.name })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.main_header {
    @apply flex justify-between;
    .logo {
      @apply cursor-pointer;
        max-width: 150px;
    }
}
</style>