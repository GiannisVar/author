<template>
    <button v-if="isButton" class="menu_button">
        <span>{{ $t(label) }}</span>
    </button>
    <span v-else class="menu_item" :class="{ 'menu_item--active' : active }">{{ $t(label) }}</span>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        label: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
        },
        isButton: {
            type: Boolean,
        }
    }
}
</script>

<style lang="scss" scoped>
.menu_item {
    @apply opacity-60 inline-block;
    &::after {
        @apply w-0 block bg-black;
        content: ' ';
        height: 1px;
        transition: 300ms;
    }
    &--active, &:hover {
        @apply opacity-100;
        &::after {
            @apply w-full;
        }
    }
}
.menu_button {
    @apply px-4 py-1 bg-gold-50 rounded-full;
    &:hover {
        @apply bg-gold-100;
    }
}
</style>