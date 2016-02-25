import wrapChromeApi from './wrap-chrome-api';

const {tabs} = chrome;
const tabsApi = wrapChromeApi.bind(null, tabs);

const tabsWrapper = {
  getAllCurrentWindow() {
    return tabsApi('query', {currentWindow: true});
  },

  get(id) {
    return tabsApi('get', id);
  },

  getCurrent() {
    return tabsApi('getCurrent');
  },

  isCurrent(id) {
    return tabsApi('getCurrent').then(tab => tab.id == id);
  },

  create(url) {
    return tabsApi('create', {url});
  },

  activate(id) {
    return tabsApi('update', id, {active: true});
  },

  pin(id) {
    return tabsApi('update', id, {pinned: true});
  },

  unpin(id) {
    return tabsApi('update', id, {pinned: false});
  },

  close(id) {
    return tabsApi('remove', id);
  },

  reload(id) {
    return tabsApi('reload', id);
  },

  duplicate(id) {
    return tabsApi('duplicate', id);
  },

  capture() {
    return tabsApi('captureVisibleTab', null, {format: 'png'});
  }
};

const EVENTS_TABS = [
  'Updated',
  'Created',
  'Removed',
  'Detached',
  'Attached',
  'Activated',
  'Highlighted'
];

EVENTS_TABS.forEach(event => {
  const on = 'on' + event;
  const off = 'off' + event;

  tabsWrapper[on] = callback => {
    tabs[on].addListener(callback);
    return tabsWrapper;
  };

  tabsWrapper[off] = callback => {
    tabs[on].removeListener(callback);
    return tabsWrapper;
  }
});

export default tabsWrapper;
