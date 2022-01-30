<template>
	<view class="content">
		<u-form>
			<u-form-item label="账号">
				<u-input v-model="username"></u-input>
			</u-form-item>
			<u-form-item label="密码">
				<u-input type="password" password-icon v-model="password"></u-input>
			</u-form-item>
			<u-form-item label="确认密码">
				<u-input type="password" password-icon v-model="Cpassword"></u-input>
			</u-form-item>
			<u-button @click="commit">提交注册</u-button>
			<u-button @click="clearForm">清空表单</u-button>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				password:"",
				Cpassword:"", //确认密码
			};
		},
		methods:{
			commit(){
				console.log("register")
				//等待密码加密
				if(this.username.length==0||this.password.length==0||this.Cpassword.length==0){
					uni.showModal({
						title:"存在未填项，请重新填写"
					})
				}else if(this.password!=this.Cpassword){
					uni.showModal({
						title:"两次密码填写不一致"
					})
				}else if(this.password.length<6||this.password.length>18){
					uni.showModal({
						title:"密码长度应大于等于6且小于等于18"
					})
				}else if(this.checkPassword(this.password)==false){
					uni.showModal({
						title:"密码长度应包含大小写字母、数字三种字符"
					})
				}else{
					console.log(this.checkPassword(this.password))
					this.$u.api.register(this.username,this.password).then(res=>{
						console.log(res)
						uni.showModal({
							title:res.msg,
						})
						setTimeout(() => {    
							if(res.code=="200")
								uni.redirectTo({
									url:"../login/login"
								})
						}, 2000)
					})
				}
			},	
			checkPassword(ps){
				let B = false,S = false,N = false
				for(let i=0;i<ps.length;i++)
				{
					if(ps[i]>='A'&&ps[i]<='Z')
						B = true
					if(ps[i]>='a'&&ps[i]<='z')
						S = true
					if(ps[i]>='0'&&ps[i]<='9')
						N = true
					if(B&&S&&N)
						return true
				}
				return false
			},
			clearForm(){
				this.username = ""
				this.password = ""
				this.Cpassword = ""
			},
		}
	}
</script>

<style lang="scss">

</style>
