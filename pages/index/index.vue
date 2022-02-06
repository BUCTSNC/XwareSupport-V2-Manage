<template>
	<view class="content" :style="{ height : windowHeight+'px'}">
		<view class="list">
			<u-button type="primary" @click="scanToSignIn">扫码签到</u-button>
			<u-button type="primary" @click="scanToStartService">扫码开始服务</u-button>
			<u-button type="primary" @click="jumpToMyForms">我的工单</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",//保持登录状态未写
				windowHeight:0
			}
		},
		onLoad(params) {
			this.username = params['username']
			console.log("onLoad:"+this.username)
			this.windowHeight = uni.getSystemInfoSync().windowHeight
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

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #F3F4F6;
		.list{
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			u-button{
				width: 50%;
				margin: 0 0 150rpx 0;
			}
		}
	}
</style>
