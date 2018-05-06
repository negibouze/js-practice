import Vue from 'vue'
import App from './foundation/components/App';
import './index';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  components: { App },
  template: '<App/>'
})
