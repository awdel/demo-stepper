export const Tabs = (function Tabs() {
    const obj = {};
    obj.init = function init() {
        // Initialisation code here
        const tabs = document.querySelectorAll('[role="tab"]');
        tabs.forEach((t) => t.addEventListener('click', this.tabClick));
    };
    obj.tabClick = function tabClick(e) {
        const tab = e.target;
        const tabContainer = tab.closest('.tabs');
        const tabs = tabContainer.querySelectorAll('[role="tab"]');
        const tabPanels = tabContainer.querySelectorAll('[role="tabpanel"]');

        // Remove selected from all tabs
        tabs.forEach((t) => t.setAttribute('aria-selected', false));
        // Set selected on current tab
        tab.setAttribute('aria-selected', true);

        // Hide all tab panels
        tabPanels.forEach((t) => t.setAttribute('hidden', true));
        // Set selected tab panel
        const activeTabPanel = Array.from(tabPanels).filter((tabPanel) => tabPanel.getAttribute('id') === tab.getAttribute('aria-controls'));
        activeTabPanel[0].removeAttribute('hidden');
    };
    return obj;
}());
