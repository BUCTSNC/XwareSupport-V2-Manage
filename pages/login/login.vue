<template>
	<view class="content">
		<u-form>
			<u-form-item label="账号">
				<u-input v-model="username" placeholder="请输入账号"></u-input>
			</u-form-item>
			<u-form-item label="密码">
				<u-input type="password" password-icon v-model="password" placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-button  @click="login">登录</u-button>
			<u-button  @click="register">用户注册</u-button>
			<u-button  @click="clear">清空表单</u-button>
		</u-form>
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
			this.password = uni.getStorageInfoSync("password")
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
			clear(){
				this.username = ""
				this.password = ""
			},
		}
	}
</script>

<style lang="scss">

</style>
