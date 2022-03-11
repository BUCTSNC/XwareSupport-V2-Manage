<template>
	<view class="content" :style="{ height : windowHeight+'px'}">
		<u-button class="button" type="primary" @click="scanToSignIn">扫码签到</u-button>
		<u-button class="button" type="primary" @click="scanToStartService">扫码开始服务</u-button>
		<u-button class="button" type="primary" @click="jumpToMyForms">我的工单</u-button>
		<!-- <u-button type="primary" @click="fillMyForms">填写工单</u-button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",//保持登录状态未写
				uuid:"",
				privilege:1,
				windowHeight:0,
			}
		},
		onLoad(params) {
			this.username = params['username']
			this.privilege = params['privilege']
			//console.log("pp:"+this.privilege)
			//console.log("onLoad:"+this.username)
			this.windowHeight = uni.getSystemInfoSync().windowHeight
		},
			
		methods: {
			scanToSignIn(){
				if(this.privilege>=3){
					let that = this
					uni.scanCode({
						onlyFromCamera:false,
						scanType:['qrCode'],
						success(res) {
							//console.log(res)
							that.$u.api.scanCode(res.result).then(res => {
								uni.showToast({
									title:"签到成功",
									type:'success',
								})
							})
						},
						fail: (res) => {
							console.log("failed:"+res)
						}
					})
				}else{
					uni.showModal({
						title:"Permission denied!",
					})
				}
				
			},
			scanToStartService(){
				if(this.privilege>=2){
					let that = this
					let res0 = null
					uni.scanCode({	
						onlyFromCamera:false,
						scanType:['qrCode'],
						success(res) {
							console.log(res)
							res0 = res
							that.$u.api.startService(res.result).then(res=>{
								uni.showToast({
									title:"成功开始服务",
									type:'success',
								})
								if(res.code == "200")
								{
									//console.log("事件表入口数据：",res0.result,that.username)
									that.uuid = res0.result
									that.$u.api.buildForm(res0.result,that.username).then(res=>{
										//console.log(res)
										uni.showToast({
											title:res.msg,
											type:'success',
										})
									})
								}
							})
						},
						fail: (res) => {
							console.log("faileds:"+res)
						}
					})
				}else{
					uni.showModal({
						title:"Attention!",
						content:"You have no privilege to do that!\nPlease contact with the manager!"
					})
				}
				
			},
			jumpToMyForms(){
				if(this.privilege>=2){
					uni.navigateTo({
						url:"../myForms/myForms?username="+this.username,
					})
				}else{
					uni.showModal({
						title:"Attention!",
						content:"You have no privilege to do that!\nPlease contact with the manager!"
					})
				}
				
			},
			fillMyForms(){
				if(this.uuid==""){
					uni.showModal({
						title:"请先扫码开始服务再填写工单"
					})
				}else{
					uni.navigateTo({
						url:"../fillTickets/fillTickets?username="+this.username+"&uuid="+this.uuid,
					})
				}
				
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
		.button{
			margin: 0 0 150rpx 0;
			width: 400rpx
		}
	}
</style>