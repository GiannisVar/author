import { createApp } from 'vue';
import App from './App';
import './index.css';
import router from './router/routes';
import i18n from './locales/i18n';
import { Vue3Mq } from 'vue3-mq';
import vClickOutside from "click-outside-vue3";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.use(i18n);

app.use(Vue3Mq, {
    breakpoints: {
        xxs: 0,
        xs: 450,
        sm: 700,
        md: 992,
        lg: 1366,
        xl: Infinity,
    },
    defaultBreakpoint: 'lg',
    preset: "tailwind"
})

app.use(vClickOutside)

app.use( Vue3Toasity, { 
    containerClassName: 'container-toast-messages', 
    autoClose: 3000, 
    style: { 
        opacity: 1 
    } 
})

app.mount('#app');
