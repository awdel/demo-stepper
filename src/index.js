import './sass/styles.scss';
import { Tabs } from './js/tabs';
import { AutoComplete } from './js/autocomplete';

document.addEventListener('DOMContentLoaded', () => {
    Tabs.init();
    AutoComplete.init();
});
