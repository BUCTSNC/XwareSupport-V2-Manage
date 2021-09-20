import Vue from 'vue'
import App from './App'
import uview from 'uview-ui'
Vue.use(uview)

import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

import httpSetting from "common/httpSetting.js"
Vue.use(httpSetting, app)

import api from "common/api.js"
Vue.use(api, app)

app.$mount()
