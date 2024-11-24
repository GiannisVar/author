<template>
    <div class="main_header">
        <img class="logo" :src="logo" alt="logo"/>
        <MainMenu @open_sidebar_menu="$emit('open_sidebar', $event )" @navigation="$emit('navigation')" />
    </div>
</template>

<script>
import MainMenu from './menu/MainMenu';
import Logo from '../assets/logo/logo.png';

export default {
    name: 'MainHeader',
    components: { MainMenu },
    created() {
        this.logo = Logo;
    }
}
</script>

<style lang="scss" scoped>
.main_header {
    @apply flex justify-between;
    .logo {
        max-width: 150px;
    }
}
</style>