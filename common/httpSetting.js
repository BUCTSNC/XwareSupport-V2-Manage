const install = (Vue,vm) =>{
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://127.0.0.1:8000/wxapi', //每次请求都会将baseUrl拼接上去
		dataType: 'json', //自动将res.data转换为json
		loadingText: '努力加载中~',
		loadingTime: 800,
		originalData: true, //源信息开启，必须开启，否则无法获得cookies
	})
	//请求拦截器
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.Cookie = uni.getStorageSync("cookie") //获取cookie
		return config
	}
	//返回拦截器
	Vue.prototype.$u.http.interceptor.response  = (res) =>{
		//console.log(res)
		if(res.cookies.length>0){
			uni.setStorageSync("cookie",res.cookies[0]) // 设置cookie
		}
		return res.data
	}
}

export default {
	install
}