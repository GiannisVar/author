import { createI18n } from "vue-i18n";
import en from "./langs/en";
import el from "./langs/el";

const LOCALES = {
  EL: 'el',
  EN: 'en'
};

const getCurrentLocale = () => {
  if( !localStorage.getItem('selectedLanguage') ||  
      (localStorage.getItem('selectedLanguage') && !Object.values(LOCALES).some(locale => localStorage.getItem('selectedLanguage').includes(locale)))
  ) {
    localStorage.setItem('selectedLanguage', LOCALES.EN); 
  }
  return localStorage.getItem('selectedLanguage');
};

export default createI18n({
  locale: getCurrentLocale(),
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en,
    el
  },
});