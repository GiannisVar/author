import { createI18n } from "vue-i18n";
import en from "./langs/en";
import el from "./langs/el";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en,
    el
  },
});