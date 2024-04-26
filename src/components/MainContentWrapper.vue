<template>
    <div class="main_content_wrapper">
        <h1 class="title">{{ $t(`mainTitle.${$route.name || 'homepage'}`) }}</h1>
        <router-view @navigate="$emit('navigation')"/>
    </div>
</template>

<script>
export default {
    name: 'MainContentWrapper',
}
</script>

<style lang="scss" scoped>
.main_content_wrapper {
    @apply w-full text-gray-500 py-8;
    .title {
        @apply text-center pb-4 text-2xl;
        &::after {
            @apply w-full block bg-black mt-1 opacity-30 mt-4;
            content: ' ';
            height: 1px;
        }
    }
}
</style>