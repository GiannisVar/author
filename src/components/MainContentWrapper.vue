<template>
    <div class="main_content_wrapper">
        <h1 class="title">{{ $t(`mainMenu.${$route.name || 'homepage'}`) }}</h1>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'MainContentWrapper',
}
</script>

<style lang="scss" scoped>
.main_content_wrapper {
    @apply w-full;
    .title {
        @apply text-center;
        &::after {
            @apply w-full block bg-black mt-1;
            content: ' ';
            height: 1px;
        }
    }
}
</style>