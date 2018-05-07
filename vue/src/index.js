import Vue from 'vue'
import App from './foundation/components/App';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App)
  // components: { App },
  // template: '<App/>'
})
