import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.use(VueResource)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
