import Vue from 'vue'
import App from './App'
import uview from 'uview-ui'
import store from './store'
Vue.use(uview)
Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

import httpSetting from '@/common/httpSetting.js'
Vue.use(httpSetting, app)

import api from '@/common/api.js'
Vue.use(api, app)

app.$mount()
