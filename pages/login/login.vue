<template>
	<view>
		<u-form>
			<u-form-item label="账号">
				<u-input v-model="username" placeholder="请输入账号"></u-input>
			</u-form-item>
			<u-form-item label="密码">
				<u-input type="password" password-icon v-model="password" placeholder="请输入密码"></u-input>
			</u-form-item>
		</u-form>
		<view class="content">
			<u-button class="button" type="primary" @click="login">登录</u-button>
			<u-button class="button" type="primary" @click="register">注册</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				password:"",
			};
		},
		onLoad(){
			this.username = uni.getStorageSync("username")
			this.password = uni.getStorageSync("password")
		},
		methods:{
			login(){
				let that = this
				console.log("login")
				this.$u.api.login(this.username,this.password).then(res=>{
					console.log(res)
					uni.showModal({
						title:res.msg,
						//content:"即将进入主页",
					})
					setTimeout(() => {    
						if(res.code=="200")
						{
							uni.setStorageSync('username',that.username);
							uni.setStorageSync('password',that.password);
							//that.isFirstLogin = false
							console.log("设置缓存成功")
							uni.navigateTo({
								url:"../index/index?username="+this.username,
							})
						}
							
					}, 2000)
				})
			},
			register(){
				uni.navigateTo({
					url:"../register/register"
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
		margin: 500rpx 0 0 0;
		.button{
			width: 400rpx;
			margin: 50rpx 0 0 0;
			justify-content: center;
			display: flex;
			flex-direction: column;
		}
	}
</style>
