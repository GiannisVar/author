<template>
    <div class="main_content_wrapper">
        <h1 class="title">{{ $t(`mainTitle.${$route.name || 'homepage'}`) }}</h1>
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
    @apply w-full text-gray-500;
    .title {
        @apply text-center;
        &::after {
            @apply w-full block bg-black mt-1 opacity-30 mt-4;
            content: ' ';
            height: 1px;
        }
    }
}
</style>