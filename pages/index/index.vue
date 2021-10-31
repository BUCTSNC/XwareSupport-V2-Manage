<template>
	<view class="content">
		<u-button type="primary" @click="scanToSignIn">扫码签到</u-button>
		<u-button type="primary">扫码开始服务</u-button>
		<u-button type="primary">我的工单</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
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
							this.$refs.toast.show({
								title:"签到成功",
								type: "success",
							})
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
