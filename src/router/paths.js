import HomePage from '../components/mainPages/HomePage';
import AboutPage from '../components/mainPages/AboutPage';
import BookPage from '../components/mainPages/BookPage';
import PurchasePage from '../components/mainPages/PurchasePage';
import ContactMe from '../components/mainPages/ContactMe';

export const PAGES = {
    HOMEPAGE: {
        id: 'homepage',
        name: 'homepage',
        label: 'mainMenu.homepage',
        route: '/',
        isButton: false,
        component: HomePage,
    },
    ABOUT: {
        id: 'about',
        name: 'about',
        label: 'mainMenu.about',
        route: '/about',
        isButton: false,
        component: AboutPage,
    },
    BOOK: {
        id: 'book',
        name: 'book',
        label: 'mainMenu.book',
        route: '/book',
        isButton: false,
        component: BookPage,
    },
    CONTACT: {
        id: 'contact',
        name: 'contact',
        label: 'mainMenu.contact',
        route: '/contact',
        isButton: false,
        component: ContactMe,
    },
    PURCHASE: {
        id: 'purchase',
        name: 'purchase',
        label: 'mainMenu.purchase',
        route: '/purchase',
        isButton: true,
        component: PurchasePage,
    },
};

export const MAIN_MENU_LIST_ITEMS = [
    PAGES.HOMEPAGE,
    PAGES.ABOUT,
    PAGES.BOOK,
    PAGES.CONTACT,
    PAGES.PURCHASE
];

export const routes = MAIN_MENU_LIST_ITEMS.map(item => {
    return  { path: item.route, component: item.component, name: item.name };
});