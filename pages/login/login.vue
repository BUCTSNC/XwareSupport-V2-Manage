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
			<u-button @click="register">用户注册</u-button>
			<u-button @click="clear">清空表单</u-button>
			<checkbox-group @change="checkboxChange">
				<checkbox value="rm" :checked="ischeck">自动填充密码</checkbox>
			</checkbox-group>
			
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFirstLogin:true,
				ischeck:false,
				result:"ss",
				username:"",
				password:"",
			};
		},
		onLoad(){
			let that = this
			console.log(this.isFirstLogin==true)
			
			
			if(this.isFirstLogin==true)
			{
				this.isFirstLogin = false
				uni.setStorage({key: 'username',data: null,});
				uni.setStorage({key: 'password',data: null,});
			}
			uni.getStorage({
			    key: 'username',
			    success: (res) => {
					console.log(res.data)
					that.result= res.data
				},
			});
			console.log(that.result)
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
							uni.setStorage({
							    key: 'username',
							    data: that.username,
							    success: (res) => {
									console.log(res.data)
									this.result= res.data
								},
							});
							uni.setStorage({
							    key: 'password',
							    data: that.password,
							    success: (res) => {
									console.log(res.data)
									this.result= res.data
								},
							});
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
			checkboxChange(e){
				let that = this
				console.log(e.detail.value,'++++');
				if(e.detail.value=="rm"){
					console.log(this.password,this.username)
					uni.getStorage({
					    key: 'username',
					    success: (res) => {
							console.log(res.data)
							that.username= res.data
						},
					});
					uni.getStorage({
					    key: 'password',
					    success: (res) => {
							console.log(res.data)
							that.password= res.data
						},
					});
					console.log("获取缓存成功"+this.username+this.password)
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
