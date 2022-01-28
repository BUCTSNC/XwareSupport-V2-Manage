<template>
	<view class="content">
		<u-button type="primary" @click="scanToSignIn">扫码签到</u-button>
		<u-button type="primary" @click="scanToStartService">扫码开始服务</u-button>
		<u-button type="primary" @click="jumpToMyForms">我的工单</u-button>
		<!-- <u-button type="primary" @click="login">登录</u-button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",//保持登录状态未写
			}
		},
		onLoad(params) {
			this.username = params['username']
			console.log("onLoad:"+this.username)
		},
		methods: {
			scanToSignIn(){
				let that = this
				uni.scanCode({
					onlyFromCamera:false,
					scanType:['qrCode'],
					success(res) {
						 console.log(res)
						that.$u.api.scanCode(res.result).then(res => {
							uni.showToast({
								title:"签到成功",
								type:'success',
							})
						})
					}
				})
			},
			scanToStartService(){
				let that = this
				let res0 = null
				uni.scanCode({	
					onlyFromCamera:false,
					scanType:['qrCode'],
					success(res) {
						res0 = res
						that.$u.api.startService(res.result).then(res=>{
							uni.showToast({
								title:"成功开始服务",
								type:'success',
							})
							if(res.code == "200")
							{
								console.log("事件表入口数据：",res0.result,that.username)
								that.$u.api.buildForm(res0.result,that.username).then(res=>{
									console.log(res)
									uni.showToast({
										title:res.msg,
										type:'success',
									})
								})
							}
						})
					}
				})
			},
			//test
			// login(){
			// 	uni.redirectTo({
			// 		url:"../login/login"
			// 	})
			// },
			jumpToMyForms(){
				uni.navigateTo({
					url:"../myForms/myForms?username="+this.username,
				})
			},
			
		}
	}
</script>

<style>

</style>
