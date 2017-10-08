import BackTop from './backtop/src/main';

/* istanbul ignore next */
BackTop.install = function(Vue) {
  Vue.component(BackTop.name, BackTop);
};

export default BackTop;