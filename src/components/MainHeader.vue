<template>
    <div class="main_header">
        <span>Logo or Image</span>
        <MainMenu @open_sidebar_menu="$emit('open_sidebar', $event )" />
    </div>
</template>

<script>
import MainMenu from './menu/MainMenu';

export default {
    name: 'MainHeader',
    components: { MainMenu },
}
</script>

<style lang="scss" scoped>
.main_header {
    @apply flex justify-between;
}
</style>