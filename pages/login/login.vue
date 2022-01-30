<template>
	<view class="content">
		<u-form>
			<u-form-item label="账号">
				<u-input v-model="username"></u-input>
			</u-form-item>
			<u-form-item label="密码">
				<u-input type="password" password-icon v-model="password"></u-input>
			</u-form-item>
			<u-button @click="login">登录</u-button>
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
		methods:{
			login(){
				console.log("login")
				this.$u.api.login(this.username,this.password).then(res=>{
					console.log(res)
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
