import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugin/vuetify' // path to vuetify export
import VueMasonryPlugin from 'vue-masonry'

import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(VuetifyToast, {
  x: 'right', // default
  y: 'bottom', // default
  color: 'info', // default
  icon: 'info',
  iconColor: '', // default
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [],
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueMasonryPlugin)
new Vue({
  vuetify,
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
