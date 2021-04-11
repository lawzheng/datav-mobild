import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'echarts'
import VueECharts from 'vue-echarts'

import './styles/reset.css'

Vue.prototype.$echarts = ECharts
Vue.prototype.$bmap = window.BMapGL
Vue.prototype.$initMap = window.initMap
Vue.prototype.$mapvgl = window.mapvgl
Vue.prototype.$mapv = window.mapv
Vue.prototype.$purpleStyle = window.purpleStyle

Vue.config.productionTip = false

Vue.component('vue-echarts', VueECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
