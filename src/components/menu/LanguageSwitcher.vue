
<template>
 <div class="language-switcher">
    <template v-for="language in languages" :key="language.label">
        <span 
            class="language" 
            :class="{'language--selected' : isLangSelected(language.value)}"
            @click="selectLanguage(language.value)"
        >{{ $t(language.label) }}</span>
    </template>
 </div>
</template>

<script>

const LANGAUGES = {
    EN: {
        label: 'EN',
        value: 'en',
    },
    EL: {
        label: 'GR',
        value: 'el',
    }
}

export default {
    name: 'LanguageSwitcher',
    created() {
      this.languages = LANGAUGES;
    },
    methods: {
      isLangSelected(lang) {
        return localStorage.getItem('selectedLanguage') === lang;
      },
      selectLanguage(lang) {
        if(!this.isLangSelected(lang)) {
          localStorage.setItem('selectedLanguage', lang);
          this.$router.go();
        }
      }
    },
}
</script>

<style lang="scss" scoped>
.language-switcher {
    @apply inline-flex;
  .language {
    @apply cursor-pointer opacity-60 px-2 text-xs relative;
    &:not(:last-child) {
      border-right-width: 1px;
    }
    &::after {
      @apply w-0 block bg-black;
      content: ' ';
      height: 1px;
      transition: 300ms;
    }
    &--selected {
      @apply font-bold opacity-100;
    }
    &:hover {
      @apply opacity-100; 
      &::after {
        @apply w-full;
      }
    }
  }
}
</style>
