import { createApp } from 'vue';
import App from './App';
import './index.css';
import router from './router/routes';
import i18n from './locales/i18n';
import { Vue3Mq } from 'vue3-mq';
import vClickOutside from "click-outside-vue3"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.use(i18n);

app.use(Vue3Mq, {
    breakpoints: {
        xxs: 0,
        xs: 450,
        sm: 680,
        md: 992,
        lg: 1366,
        xl: Infinity,
    },
    defaultBreakpoint: 'lg'
})

app.use(vClickOutside)

app.mount('#app');
